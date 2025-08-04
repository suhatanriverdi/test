import { Drill, Settings, TrendingUp } from "lucide-react";
import type { Well } from "../../types/types";

interface BitsSummaryProps {
  selectedWell: Well | null;
}

const BitsSummary = ({ selectedWell }: BitsSummaryProps) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedWell?.name} - Bits Summary
          </h2>
          <p className="text-gray-600">
            Drill bit performance analysis and optimization
          </p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="flex items-center justify-center h-96 bg-base-200 rounded-lg">
        <div className="text-center">
          <Drill className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            Bits Summary Dashboard
          </h3>
          <p className="text-gray-400 mb-4">
            Comprehensive drill bit performance metrics and analysis
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Active Bits</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span>Performance Data</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span>Wear Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bit Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Current Bit</h3>
            <div className="stat">
              <div className="stat-value text-primary">PDC-8½"</div>
              <div className="stat-desc">Polycrystalline Diamond Compact</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">ROP</h3>
            <div className="stat">
              <div className="stat-value text-secondary">45.2</div>
              <div className="stat-desc">ft/hr average</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Bit Life</h3>
            <div className="stat">
              <div className="stat-value text-accent">127</div>
              <div className="stat-desc">hours drilled</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Wear Status</h3>
            <div className="stat">
              <div className="stat-value text-info">85%</div>
              <div className="stat-desc">remaining life</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bit History Table */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title">Bit Run History</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Bit Type</th>
                  <th>Size</th>
                  <th>Start Depth</th>
                  <th>End Depth</th>
                  <th>Hours</th>
                  <th>ROP (ft/hr)</th>
                  <th>Wear</th>
                  <th>Reason Pulled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PDC</td>
                  <td>8½"</td>
                  <td>1,200</td>
                  <td>1,450</td>
                  <td>127</td>
                  <td>45.2</td>
                  <td>85%</td>
                  <td>Formation Change</td>
                </tr>
                <tr>
                  <td>PDC</td>
                  <td>8½"</td>
                  <td>950</td>
                  <td>1,200</td>
                  <td>98</td>
                  <td>52.1</td>
                  <td>90%</td>
                  <td>Target Depth</td>
                </tr>
                <tr>
                  <td>TCI</td>
                  <td>8½"</td>
                  <td>750</td>
                  <td>950</td>
                  <td>156</td>
                  <td>38.7</td>
                  <td>75%</td>
                  <td>Wear Out</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Average ROP</span>
                <span className="font-semibold">45.2 ft/hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Best ROP</span>
                <span className="font-semibold">67.8 ft/hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Drilled</span>
                <span className="font-semibold">1,450 ft</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bit Cost</span>
                <span className="font-semibold">$45,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Optimization Recommendations</h3>
            <div className="space-y-3">
              <div className="alert alert-info">
                <Settings className="w-4 h-4" />
                <span>
                  Consider PDC bit for next run - better ROP in current
                  formation
                </span>
              </div>
              <div className="alert alert-warning">
                <TrendingUp className="w-4 h-4" />
                <span>Increase WOB by 2,000 lbs for better penetration</span>
              </div>
              <div className="alert alert-success">
                <Drill className="w-4 h-4" />
                <span>
                  Current bit performing above average for this formation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitsSummary;
