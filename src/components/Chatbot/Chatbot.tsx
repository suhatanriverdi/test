import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Trash2 } from "lucide-react";
import { geminiApi } from "../../services/gemini";

interface ChatMessage {
  message: string;
  role: "user" | "assistant";
  timestamp: Date;
  error?: boolean;
}

const INITIAL_MESSAGE: ChatMessage = {
  message:
    "Hello! I'm your AI drilling assistant. I can help you with:\n\n" +
    "• Analyzing drilling data and parameters\n" +
    "• Troubleshooting drilling equipment issues\n" +
    "• Understanding well operations and best practices\n" +
    "• Interpreting well logs and measurements\n\n" +
    "How can I assist you today?",
  role: "assistant",
  timestamp: new Date(),
};

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      message: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await geminiApi.generateResponse(inputMessage);

      const assistantMessage: ChatMessage = {
        message: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: ChatMessage = {
        message:
          error instanceof Error
            ? error.message
            : "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
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
    <div className="flex flex-col h-full bg-base-100 rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">Drilling Assistant</h2>
        </div>
        <button
          onClick={clearChat}
          className="btn btn-ghost btn-sm"
          title="Clear chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                {msg.role === "user" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
            </div>
            <div
              className={`chat-bubble ${
                msg.role === "user"
                  ? "chat-bubble-primary"
                  : msg.error
                  ? "chat-bubble-error"
                  : "chat-bubble-secondary"
              }`}
            >
              {msg.message}
            </div>
            <div className="chat-footer opacity-50 text-xs">
              {formatTime(msg.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <textarea
            className="textarea textarea-bordered flex-1"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={isLoading}
          />
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? null : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold">AI Drilling Assistant</h3>
        </div>
        <button
          onClick={clearChat}
          className="btn btn-ghost btn-sm"
          title="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold mb-2">
              Welcome to the AI Drilling Assistant!
            </p>
            <p className="text-sm">
              I can help you with drilling operations, data analysis, equipment
              troubleshooting, and more. Ask me anything about oil drilling!
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
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
                className={`rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-base-200 rounded-lg px-4 py-2">
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

      {/* Input */}
      <div className="p-4 border-t border-base-300">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about drilling operations, data analysis, or equipment..."
            className="flex-1 textarea textarea-bordered resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="btn btn-primary"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
