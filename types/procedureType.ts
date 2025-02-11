type ProcedureType = {
  resourceType: "Procedure";
  id: string;
  meta: {
    profile: string[];
  };
  status:
    | "completed"
    | "in-progress"
    | "on-hold"
    | "stopped"
    | "draft"
    | "entered-in-error"; // Adjust based on possible values
  code: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  };
  subject: {
    reference: string;
  };
  encounter: {
    reference: string;
  };
  performedPeriod: {
    start: string; // ISO 8601 date-time string
    end: string; // ISO 8601 date-time string
  };
  location: {
    reference: string;
    display: string;
  };
};

type ProcedureRequest = {
  method: "POST";
  url: "Procedure";
};

export interface ProcedureData {
  fullUrl: string;
  resource: ProcedureType;
  request: ProcedureRequest;
}
