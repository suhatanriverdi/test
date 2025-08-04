import { useState } from "react";
import type { Well } from "../../types/types";
import WellListItem from "./WellListItem";
import { Search } from "lucide-react";

interface WellListProps {
  wells: Well[];
  onSelectWell: (well: Well) => void;
  collapsed?: boolean;
}

const WellList = ({
  wells,
  onSelectWell,
  collapsed = false,
}: WellListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWells = wells.filter((well) =>
    well.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (collapsed) {
    return (
      <div className="flex flex-col items-center space-y-2 p-2">
        {filteredWells.map((well) => (
          <div
            key={well.id || well._id}
            className="tooltip tooltip-right"
            data-tip={well.name}
          >
            <button
              onClick={() => onSelectWell(well)}
              className="btn btn-circle btn-sm"
            >
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-base-200 h-full w-full flex flex-col">
      <div className="p-4 border-b border-base-300">
        <div className="form-control">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search wells..."
              className="input input-bordered w-full pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-ghost btn-sm absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow">
        {filteredWells.length > 0 ? (
          <ul className="menu p-2">
            {filteredWells.map((well) => (
              <WellListItem
                key={well.id || well._id}
                well={well}
                onSelect={() => onSelectWell(well)}
              />
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">No wells found</div>
        )}
      </div>
    </div>
  );
};

export default WellList;
