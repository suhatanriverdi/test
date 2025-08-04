import { useState } from "react";
import { Filter, Upload, ZoomIn, ZoomOut } from "lucide-react";
import type { Well } from "../../types/types";
import DrillingMonitoring from "./DrillingMonitoring";
import OffsetWellsMap from "./OffsetWellsMap";
import BitsSummary from "./BitsSummary";

interface MainDashboardProps {
  selectedWell: Well | null;
}

const MainDashboard = ({ selectedWell }: MainDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"drilling" | "offset" | "bits">(
    "drilling"
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showUpload, setShowUpload] = useState(false);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.25));
  };

  if (!selectedWell) {
    return (
      <div className="flex-1 flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-500 mb-2">
            Select a well to view details
          </h3>
          <p className="text-gray-400">
            Choose a well from the list on the left
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-base-100">
      {/* Tab Navigation and Controls */}
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        {/* Tabs */}
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${activeTab === "drilling" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("drilling")}
          >
            Drilling Monitoring
          </button>
          <button
            className={`tab ${activeTab === "offset" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("offset")}
          >
            Offset Wells Map
          </button>
          <button
            className={`tab ${activeTab === "bits" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("bits")}
          >
            Bits Summary
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Filter Button */}
          <button className="btn btn-outline btn-sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </button>

          {/* Upload Button (Mavi) */}
          <button 
            onClick={() => setShowUpload(!showUpload)}
            className="btn btn-primary btn-sm"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload New Data
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 ml-4">
            <button
              onClick={handleZoomOut}
              className="btn btn-ghost btn-sm"
              disabled={zoomLevel <= 0.25}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm font-mono px-2">
              {zoomLevel.toFixed(2)}x
            </span>
            <button
              onClick={handleZoomIn}
              className="btn btn-ghost btn-sm"
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full w-full overflow-auto"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >
          {activeTab === "drilling" && (
            <DrillingMonitoring selectedWell={selectedWell} showUpload={showUpload} setShowUpload={setShowUpload} />
          )}
          {activeTab === "offset" && (
            <OffsetWellsMap selectedWell={selectedWell} />
          )}
          {activeTab === "bits" && <BitsSummary selectedWell={selectedWell} />}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
