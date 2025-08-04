import type { Well } from "../../types/types";

interface WellListItemProps {
  well: Well;
  onSelect: () => void;
}

const WellListItem = ({ well, onSelect }: WellListItemProps) => {
  const getStatusColor = (status: Well["status"]) => {
    switch (status) {
      case "active":
        return "bg-success";
      case "inactive":
        return "bg-error";
      case "maintenance":
        return "bg-warning";
      default:
        return "bg-info";
    }
  };

  return (
    <li className="mb-2">
      <a
        onClick={onSelect}
        className="flex flex-col p-3 hover:bg-base-300 rounded-lg transition-colors"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">{well.name}</span>
          <span
            className={`badge ${getStatusColor(
              well.status
            )} text-white capitalize`}
          >
            {well.status}
          </span>
        </div>
        <div className="text-sm text-gray-500 mt-1">Depth: {well.depth} ft</div>
        <div className="text-xs text-gray-400 mt-1">
          Last updated: {well.lastUpdated}
        </div>
      </a>
    </li>
  );
};

export default WellListItem;
