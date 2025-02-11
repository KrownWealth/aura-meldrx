type MedicationRequestType = {
  resourceType: "MedicationRequest";
  id: string;
  meta: {
    profile: string[];
  };
  status:
    | "active"
    | "on-hold"
    | "completed"
    | "stopped"
    | "draft"
    | "entered-in-error"; // Adjust based on possible values
  intent: "proposal" | "plan" | "order" | "instance-order"; // Adjust based on possible values
  category: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  }>;
  medicationCodeableConcept: {
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
  authoredOn: string; // ISO 8601 date-time string
  requester: {
    reference: string;
    display: string;
  };
  reasonReference: Array<{
    reference: string;
    display: string;
  }>;
  dosageInstruction: Array<{
    sequence: number;
    timing: {
      repeat: {
        frequency: number;
        period: number;
        periodUnit: "d" | "h" | "wk" | "mo" | "a"; // Adjust based on possible units
      };
    };
    asNeededBoolean: boolean;
    doseAndRate: Array<{
      type: {
        coding: Array<{
          system: string;
          code: string;
          display: string;
        }>;
      };
      doseQuantity: {
        value: number;
      };
    }>;
  }>;
};

type MedicationRequestRequest = {
  method: "POST";
  url: "MedicationRequest";
};

export interface MedicationRequestData {
  fullUrl: string;
  resource: MedicationRequestType;
  request: MedicationRequestRequest;
}
