type MedicationAdministrationType = {
  resourceType: "MedicationAdministration";
  id: string;
  status:
    | "in-progress"
    | "on-hold"
    | "completed"
    | "stopped"
    | "entered-in-error"; // Adjust based on possible values
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
  context: {
    reference: string;
  };
  effectiveDateTime: string; // ISO 8601 date-time string
};

type MedicationAdministrationRequest = {
  method: "POST";
  url: "MedicationAdministration";
};

export interface MedicationAdministrationData {
  fullUrl: string;
  resource: MedicationAdministrationType;
  request: MedicationAdministrationRequest;
}
