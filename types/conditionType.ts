type ConditionType = {
  resourceType: "Condition";
  id: string;
  meta: {
    profile: string[];
  };
  clinicalStatus: {
    coding: Array<{
      system: string;
      code: string;
    }>;
  };
  verificationStatus: {
    coding: Array<{
      system: string;
      code: string;
    }>;
  };
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
  onsetDateTime: string; // ISO 8601 date-time string
  recordedDate: string; // ISO 8601 date-time string
};

type ConditionRequest = {
  method: "POST";
  url: "Condition";
};

export interface ConditionData {
  fullUrl: string;
  resource: ConditionType;
  request: ConditionRequest;
}
