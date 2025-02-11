type CarePlanType = {
  resourceType: "CarePlan";
  id: string;
  meta: {
    profile: string[];
  };
  text: {
    status: "generated" | "extensions"; // Adjust based on possible values
    div: string;
  };
  status: "active" | "suspended" | "completed" | "entered-in-error"; // Adjust based on possible values
  intent: "proposal" | "plan" | "order"; // Adjust based on possible values
  category: Array<{
    coding: Array<{
      system: string;
      code: string;
      display?: string; // Optional property
    }>;
    text?: string; // Optional property
  }>;
  subject: {
    reference: string;
  };
  encounter: {
    reference: string;
  };
  period: {
    start: string; // ISO 8601 date-time string
    end?: string; // Optional property
  };
  careTeam?: Array<{
    reference: string;
  }>;
  addresses?: Array<{
    reference: string;
  }>;
  activity: Array<{
    detail: {
      code: {
        coding: Array<{
          system: string;
          code: string;
          display: string;
        }>;
        text: string;
      };
      reasonReference?: Array<{
        reference: string;
      }>;
      status:
        | "not-started"
        | "scheduled"
        | "in-progress"
        | "on-hold"
        | "completed"
        | "entered-in-error"; // Adjust based on possible values
      location?: {
        display: string;
      };
    };
  }>;
};

type CarePlanRequest = {
  method: "POST";
  url: "CarePlan";
};

export interface CarePlanData {
  fullUrl: string;
  resource: CarePlanType;
  request: CarePlanRequest;
}
