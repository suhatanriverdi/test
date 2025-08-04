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
  ScatterChart,
  Scatter,
} from "recharts";
import { Database, TrendingUp, Activity } from "lucide-react";
import type { Well } from "../../types/types";
import FileUploadComponent from "../FileUpload/FileUpload";
// Define DrillingDataRow type locally
export interface DrillingDataRow {
  DEPTH: number;
  SH: number;
  SS: number;
  LS: number;
  DOL: number;
  ANH: number;
  Coal: number;
  Salt: number;
  DT: number;
  GR: number;
}

interface MainDashboardProps {
  selectedWell: Well | null;
  showUpload: boolean;
  setShowUpload: (show: boolean) => void;
}


// Sample drilling data as provided
const sampleDrillingData = [
  {
    DEPTH: 1267,
    SH: 0.337,
    SS: 0.663,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 613.78,
    GR: 736.99,
  },
  {
    DEPTH: 1268,
    SH: 0.4452,
    SS: 0.5548,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 631.77,
    GR: 845.21,
  },
  {
    DEPTH: 1269,
    SH: 0.492,
    SS: 0.508,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 637.23,
    GR: 892.05,
  },
  {
    DEPTH: 1270,
    SH: 0.4802,
    SS: 0.5198,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 614.75,
    GR: 880.21,
  },
  {
    DEPTH: 1271,
    SH: 0.475,
    SS: 0.525,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 634.55,
    GR: 875.02,
  },
  {
    DEPTH: 1272,
    SH: 0.6708,
    SS: 0.3292,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 771.3,
    GR: 1070.8,
  },
  {
    DEPTH: 1273,
    SH: 0.5532,
    SS: 0.4468,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 785.32,
    GR: 953.19,
  },
  {
    DEPTH: 1274,
    SH: 0.4359,
    SS: 0.5641,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 653.19,
    GR: 835.93,
  },
  {
    DEPTH: 1275,
    SH: 0.602,
    SS: 0.398,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 744.45,
    GR: 1001.99,
  },
  {
    DEPTH: 1276,
    SH: 0.4196,
    SS: 0.5804,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 569.09,
    GR: 819.63,
  },
  {
    DEPTH: 1277,
    SH: 0.3398,
    SS: 0.6602,
    LS: 0,
    DOL: 0,
    ANH: 0,
    Coal: 0,
    Salt: 0,
    DT: 623.91,
    GR: 739.77,
  },
];

const DrillingMonitoring = ({
  selectedWell,
  showUpload,
  setShowUpload,
}: MainDashboardProps) => {
  const [drillingData, setDrillingData] = useState(sampleDrillingData);

  const handleDataProcessed = (data: DrillingDataRow[]) => {
    setDrillingData(data);
    setShowUpload(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedWell?.name} - Drilling Monitoring
          </h2>
          <p className="text-gray-600">
            Real-time drilling data analysis and visualization
          </p>
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Upload Drilling Data</h3>
            <FileUploadComponent
              onDataProcessed={handleDataProcessed}
              selectedWellId={selectedWell?.id}
            />
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-primary">
            <Database className="w-8 h-8" />
          </div>
          <div className="stat-title">Data Points</div>
          <div className="stat-value text-primary">{drillingData.length}</div>
          <div className="stat-desc">Total measurements</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-secondary">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Depth Range</div>
          <div className="stat-value text-secondary">
            {Math.min(...drillingData.map((d) => d.DEPTH))} -{" "}
            {Math.max(...drillingData.map((d) => d.DEPTH))}
          </div>
          <div className="stat-desc">feet</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-accent">
            <Activity className="w-8 h-8" />
          </div>
          <div className="stat-title">Avg GR</div>
          <div className="stat-value text-accent">
            {(
              drillingData.reduce((sum, d) => sum + d.GR, 0) /
              drillingData.length
            ).toFixed(1)}
          </div>
          <div className="stat-desc">Gamma Ray</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-info">
            <Database className="w-8 h-8" />
          </div>
          <div className="stat-title">Avg DT</div>
          <div className="stat-value text-info">
            {(
              drillingData.reduce((sum, d) => sum + d.DT, 0) /
              drillingData.length
            ).toFixed(1)}
          </div>
          <div className="stat-desc">Sonic Travel Time</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gamma Ray vs Depth */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Gamma Ray vs Depth</h3>
            <div className="w-full h-[300px] overflow-hidden">
              <ResponsiveContainer>
                <LineChart
                  data={drillingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="DEPTH"
                    type="number"
                    domain={["auto", "auto"]}
                    allowDataOverflow
                  />
                  <YAxis allowDataOverflow domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="GR"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sonic Travel Time vs Depth */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Sonic Travel Time vs Depth</h3>
            <div className="w-full h-[300px] overflow-hidden">
              <ResponsiveContainer>
                <LineChart
                  data={drillingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="DEPTH"
                    type="number"
                    domain={["auto", "auto"]}
                    allowDataOverflow
                  />
                  <YAxis allowDataOverflow domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="DT"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Shale vs Sandstone Distribution */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Shale vs Sandstone Distribution</h3>
            <div className="w-full h-[300px] overflow-hidden">
              <ResponsiveContainer>
                <BarChart
                  data={drillingData.slice(0, 8)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="DEPTH"
                    type="number"
                    domain={["auto", "auto"]}
                    allowDataOverflow
                  />
                  <YAxis allowDataOverflow domain={["auto", "auto"]} />
                  <Tooltip />
                  <Bar dataKey="SH" fill="#8884d8" name="Shale" />
                  <Bar dataKey="SS" fill="#82ca9d" name="Sandstone" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cross Plot: GR vs DT */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">GR vs DT Cross Plot</h3>
            <div className="w-full h-[300px] overflow-hidden">
              <ResponsiveContainer>
                <ScatterChart
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="GR"
                    type="number"
                    domain={["auto", "auto"]}
                    allowDataOverflow
                  />
                  <YAxis
                    dataKey="DT"
                    allowDataOverflow
                    domain={["auto", "auto"]}
                  />
                  <Tooltip />
                  <Scatter data={drillingData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Drilling Data Table</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Depth (ft)</th>
                  <th>Shale (%)</th>
                  <th>Sandstone (%)</th>
                  <th>Limestone (%)</th>
                  <th>Dolomite (%)</th>
                  <th>Anhydrite (%)</th>
                  <th>Coal (%)</th>
                  <th>Salt (%)</th>
                  <th>DT (μs/ft)</th>
                  <th>GR (API)</th>
                </tr>
              </thead>
              <tbody>
                {drillingData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.DEPTH}</td>
                    <td>{(row.SH * 100).toFixed(1)}</td>
                    <td>{(row.SS * 100).toFixed(1)}</td>
                    <td>{(row.LS * 100).toFixed(1)}</td>
                    <td>{(row.DOL * 100).toFixed(1)}</td>
                    <td>{(row.ANH * 100).toFixed(1)}</td>
                    <td>{(row.Coal * 100).toFixed(1)}</td>
                    <td>{(row.Salt * 100).toFixed(1)}</td>
                    <td>{row.DT.toFixed(2)}</td>
                    <td>{row.GR.toFixed(2)}</td>
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

export default DrillingMonitoring;
