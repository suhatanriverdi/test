import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Upload, Database, TrendingUp, Activity } from "lucide-react";
import type { Well } from "../../types/types";
import FileUploadComponent from "../FileUpload/FileUpload";
import Chatbot from "../Chatbot/Chatbot";

interface DashboardProps {
  selectedWell: Well | null;
}

const Dashboard = ({ selectedWell }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "data" | "upload" | "chat"
  >("overview");
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  const handleDataProcessed = (data: any[]) => {
    setUploadedData(data);
    setActiveTab("data");
  };

  if (!selectedWell) {
    return (
      <div className="h-full w-full flex justify-center items-center bg-base-100 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-500">
            Select a well to view details
          </h3>
          <p className="text-gray-400 mt-2">
            Choose a well from the list on the left
          </p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{selectedWell.name}</h2>
        <div className="badge badge-lg">
          <span
            className={`w-3 h-3 rounded-full mr-2 ${
              selectedWell.status === "active"
                ? "bg-success"
                : selectedWell.status === "maintenance"
                ? "bg-warning"
                : "bg-error"
            }`}
          ></span>
          {selectedWell.status.charAt(0).toUpperCase() +
            selectedWell.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-primary">
            <Database className="w-8 h-8" />
          </div>
          <div className="stat-title">Depth</div>
          <div className="stat-value text-primary">
            {selectedWell.depth.toLocaleString()}
          </div>
          <div className="stat-desc">feet</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-secondary">
            <Activity className="w-8 h-8" />
          </div>
          <div className="stat-title">Status</div>
          <div className="stat-value text-secondary">{selectedWell.status}</div>
          <div className="stat-desc">Current operation</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-accent">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Drill Type</div>
          <div className="stat-value text-accent">
            {selectedWell.details?.drillType || "N/A"}
          </div>
          <div className="stat-desc">Method</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-info">
            <Upload className="w-8 h-8" />
          </div>
          <div className="stat-title">Data Points</div>
          <div className="stat-value text-info">{uploadedData.length}</div>
          <div className="stat-desc">Uploaded records</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-lg">Well Information</h3>
            <div className="divider my-1"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p>{selectedWell.location}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Last Updated</p>
                <p>{selectedWell.lastUpdated}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Operator</p>
                <p>{selectedWell.details?.operator || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Start Date</p>
                <p>{selectedWell.details?.startDate || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-lg">Drilling Details</h3>
            <div className="divider my-1"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Est. Completion</p>
                <p>{selectedWell.details?.estimatedCompletion || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Notes</p>
                <p className="text-sm">
                  {selectedWell.details?.notes || "No notes available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataVisualization = () => {
    if (uploadedData.length === 0) {
      return (
        <div className="text-center py-8">
          <Database className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-400">
            Upload drilling data to see visualizations
          </p>
        </div>
      );
    }

    // Sample chart data - in a real app, you'd process the actual uploaded data
    const chartData = uploadedData.slice(0, 10).map((_, index) => ({
      name: `Point ${index + 1}`,
      value: Math.random() * 100,
      depth: Math.random() * 1000,
    }));

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Drilling Data Analysis</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="card-title">Depth vs Value</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="card-title">Depth Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="depth" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h4 className="card-title">Raw Data</h4>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    {Object.keys(uploadedData[0] || {}).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value: any, valueIndex) => (
                        <td key={valueIndex}>{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Upload className="w-6 h-6" />
        <h3 className="text-xl font-bold">Upload Drilling Data</h3>
      </div>
      <FileUploadComponent
        onDataProcessed={handleDataProcessed}
        selectedWellId={selectedWell.id}
      />
    </div>
  );

  const renderChat = () => (
    <div className="h-full">
      <Chatbot />
    </div>
  );

  return (
    <div className="h-full w-full bg-base-100 flex flex-col">
      {/* Tabs */}
      <div className="tabs tabs-boxed p-4">
        <button
          className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === "data" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("data")}
        >
          Data Analysis
        </button>
        <button
          className={`tab ${activeTab === "upload" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Data
        </button>
        <button
          className={`tab ${activeTab === "chat" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          AI Assistant
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "data" && renderDataVisualization()}
        {activeTab === "upload" && renderUpload()}
        {activeTab === "chat" && renderChat()}
      </div>
    </div>
  );
};

export default Dashboard;
