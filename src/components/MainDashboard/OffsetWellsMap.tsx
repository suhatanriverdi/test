import { Map, MapPin, Layers, Navigation } from "lucide-react";
import type { Well } from "../../types/types";

interface OffsetWellsMapProps {
  selectedWell: Well | null;
}

const OffsetWellsMap = ({ selectedWell }: OffsetWellsMapProps) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedWell?.name} - Offset Wells Map
          </h2>
          <p className="text-gray-600">
            Geographic visualization of nearby wells and drilling operations
          </p>
        </div>
      </div>

      {/* Placeholder Map Content */}
      <div className="flex items-center justify-center h-96 bg-base-200 rounded-lg">
        <div className="text-center">
          <Map className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            Offset Wells Map
          </h3>
          <p className="text-gray-400 mb-4">
            Interactive map showing the location of nearby wells and drilling operations
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Current Well</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span>Offset Wells</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span>Geological Features</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Well Locations
            </h3>
            <div className="divider my-1"></div>
            <p className="text-sm text-gray-600">
              View and filter nearby wells based on distance, depth, and operational status
            </p>
            <div className="mt-2">
              <button className="btn btn-sm btn-outline w-full">
                Show All Wells
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg flex items-center">
              <Layers className="w-5 h-5 mr-2" />
              Map Layers
            </h3>
            <div className="divider my-1"></div>
            <p className="text-sm text-gray-600">
              Toggle different map layers to visualize geological formations, property boundaries, and infrastructure
            </p>
            <div className="mt-2">
              <button className="btn btn-sm btn-outline w-full">
                Manage Layers
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              Navigation
            </h3>
            <div className="divider my-1"></div>
            <p className="text-sm text-gray-600">
              Tools for measuring distances, creating routes, and analyzing spatial relationships between wells
            </p>
            <div className="mt-2">
              <button className="btn btn-sm btn-outline w-full">
                Measurement Tools
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffsetWellsMap;