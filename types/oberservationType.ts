type ObservationType = {
  resourceType: "Observation";
  id: string;
  meta: {
    profile: string[];
  };
  status:
    | "final"
    | "preliminary"
    | "amended"
    | "cancelled"
    | "entered-in-error";
  category: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  }>;
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
  effectiveDateTime: string; // ISO 8601 date-time string
  issued: string; // ISO 8601 date-time string
  valueCodeableConcept: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  };
};

type ObservationRequest = {
  method: "POST";
  url: "Observation";
};

export interface ObservationData {
  fullUrl: string;
  resource: ObservationType;
  request: ObservationRequest;
}
