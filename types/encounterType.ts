type EncounterType = {
  resourceType: "Encounter";
  id: string;
  meta: {
    profile: string[];
  };
  identifier: Array<{
    use: "official" | "secondary"; // Adjust based on possible values
    system: string;
    value: string;
  }>;
  status:
    | "planned"
    | "arrived"
    | "in-progress"
    | "onleave"
    | "finished"
    | "cancelled"; // Adjust based on possible values
  class: {
    system: string;
    code: string;
  };
  type: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string; // Display text for the encounter type
  }>;
  subject: {
    reference: string;
    display: string; // Patient's name
  };
  participant: Array<{
    type: Array<{
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string; // Description of the participant type
    }>;
    period: {
      start: string; // ISO 8601 date-time string
      end: string; // ISO 8601 date-time string
    };
    individual: {
      reference: string;
      display: string; // Name of the individual participant
    };
  }>;
  period: {
    start: string; // ISO 8601 date-time string
    end: string; // ISO 8601 date-time string
  };
  location: Array<{
    location: {
      reference: string;
      display: string; // Name of the location
    };
  }>;
  serviceProvider: {
    reference: string;
    display: string; // Name of the service provider organization
  };
};

type EncounterRequest = {
  method: "POST";
  url: "Encounter";
};

export interface EncounterData {
  fullUrl: string;
  resource: EncounterType;
  request: EncounterRequest;
}
