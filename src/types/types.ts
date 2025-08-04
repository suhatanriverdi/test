interface Well {
  id?: string;
  _id?: string;
  name: string;
  depth: number;
  location: string;
  status: "active" | "inactive" | "maintenance";
  lastUpdated: string;
  details?: {
    operator?: string;
    drillType?: string;
    startDate?: string;
    estimatedCompletion?: string;
    notes?: string;
  };
  operator?: string;
  drillType?: string;
  startDate?: string;
  estimatedCompletion?: string;
  notes?: string;
  drillingData?: any[];
}

export type { Well };
