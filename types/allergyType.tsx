type AllergyIntoleranceType = {
  TypeType: "AllergyIntolerance";
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
  type: "allergy" | "intolerance"; // Adjust based on possible values
  category: Array<string>; // Possible categories could be "food", "medication", "environment", etc.
  criticality: "low" | "moderate" | "high"; // Adjust based on possible values
  code: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  };
  patient: {
    reference: string;
  };
  recordedDate: string; // ISO 8601 date-time string
};

type AllergyIntoleranceRequest = {
  method: "POST";
  url: "AllergyIntolerance";
};

export interface AllergyIntoleranceData {
  fullUrl: string;
  Type: AllergyIntoleranceType;
  request: AllergyIntoleranceRequest;
};
