import { useState, useEffect } from "react";
import WellList from "./components/WellList/WellList";
import MainDashboard from "./components/MainDashboard/MainDashboard";
import DrillAI from "./components/DrillAI/DrillAI";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { wellsApi, type Well } from "./services/api";

export default function App() {
  const [wells, setWells] = useState<Well[]>([]);
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchWells();
  }, []);

  const fetchWells = async () => {
    try {
      setLoading(true);
      const response = await wellsApi.getAll();
      setWells(response.data);

      // If no wells in database, create some mock wells
      if (response.data.length === 0) {
        await createMockWells();
      }
    } catch (error) {
      console.error("Failed to fetch wells:", error);
      setError("Failed to load wells data");
    } finally {
      setLoading(false);
    }
  };

  const createMockWells = async () => {
    const mockWells = [
      {
        name: "Well Alpha-1",
        depth: 5280,
        location: "Texas, USA",
        status: "active" as const,
        lastUpdated: "2023-10-15",
        operator: "Energent Operations",
        drillType: "Horizontal",
        startDate: "2023-01-15",
        estimatedCompletion: "2023-12-30",
        notes: "Operating at optimal capacity",
      },
      {
        name: "Well Beta-2",
        depth: 4350,
        location: "Alberta, Canada",
        status: "active" as const,
        lastUpdated: "2023-10-12",
        operator: "Energent North",
        drillType: "Vertical",
        startDate: "2023-02-20",
        estimatedCompletion: "2023-11-15",
        notes: "Minor pressure fluctuations observed",
      },
      {
        name: "Well Gamma-3",
        depth: 6120,
        location: "North Dakota, USA",
        status: "maintenance" as const,
        lastUpdated: "2023-10-05",
        operator: "Energent Drilling Co.",
        drillType: "Directional",
        startDate: "2022-11-10",
        estimatedCompletion: "2023-10-30",
        notes: "Under maintenance for pump replacement",
      },
      {
        name: "Well Delta-4",
        depth: 3890,
        location: "Oklahoma, USA",
        status: "inactive" as const,
        lastUpdated: "2023-09-28",
        operator: "Energent South",
        drillType: "Vertical",
        startDate: "2023-03-05",
        estimatedCompletion: "2023-09-15",
        notes: "Temporarily inactive due to regulatory inspection",
      },
      {
        name: "Well Epsilon-5",
        depth: 7240,
        location: "Gulf of Mexico",
        status: "active" as const,
        lastUpdated: "2023-10-14",
        operator: "Energent Offshore",
        drillType: "Offshore",
        startDate: "2022-08-20",
        estimatedCompletion: "2024-02-28",
        notes: "Deep water operation proceeding as planned",
      },
    ];

    try {
      const createdWells = await Promise.all(
        mockWells.map((well) => wellsApi.create(well))
      );
      setWells(createdWells.map((response) => response.data));
    } catch (error) {
      console.error("Failed to create mock wells:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-lg">Loading Oil Drilling Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="text-error text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-error mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchWells} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-base-100">
      {/* Collapsible Sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-80"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          {!sidebarCollapsed && <h2 className="text-lg font-bold">Wells</h2>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="btn btn-ghost btn-sm"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <WellList
            wells={wells}
            onSelectWell={setSelectedWell}
            collapsed={sidebarCollapsed}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-primary text-primary-content p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Oil Drilling Dashboard</h1>
            <p className="text-sm opacity-90">
              AI-Powered Drilling Operations Management
            </p>
          </div>
        </header>

        {/* Main Dashboard */}
        <div className="flex-1 flex overflow-hidden">
          <MainDashboard selectedWell={selectedWell} />
          <DrillAI />
        </div>
      </div>
    </div>
  );
}
