import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Trash2, Paperclip } from "lucide-react";
import { chatApi, type ChatMessage } from "../../services/api";

const DrillAI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load chat history on component mount
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await chatApi.getHistory(sessionId);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      sessionId,
      message: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(inputMessage, sessionId);

      const assistantMessage: ChatMessage = {
        sessionId,
        message: response.data.response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: ChatMessage = {
        sessionId,
        message: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      await chatApi.clearHistory(sessionId);
      setMessages([]);
    } catch (error) {
      console.error("Failed to clear chat:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-96 flex flex-col h-full overflow-hidden bg-base-100 border-l border-base-300">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-base-300 bg-primary text-primary-content">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Drill AI</h3>
        </div>
        <button
          onClick={clearChat}
          className="btn btn-ghost btn-sm text-primary-content hover:bg-primary-focus"
          title="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
          <div className="text-center">
            <Bot className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              Click to start conversation
            </h3>
            <p className="text-sm text-gray-400">
              Ask me anything about drilling operations, data analysis, or
              equipment
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xs ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-content"
                      : "bg-secondary text-secondary-content"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-3 py-2 max-w-xs ${
                    message.role === "user"
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.message}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-xs">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-base-200 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t border-base-300">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <button className="btn btn-ghost btn-sm p-2">
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Message Input */}
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type messages here..."
              className="textarea textarea-bordered w-full resize-none"
              rows={1}
              disabled={isLoading}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="btn btn-primary btn-sm p-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrillAI;
