type PatientResource = {
  resourceType: "Patient";
  id: string;
  meta: {
    profile: string[];
  };
  text: {
    status: string;
    div: string;
  };
  extension: Array<{
    url: string;
    extension?: Array<{
      url: string;
      valueCoding?: {
        system: string;
        code: string;
        display: string;
      };
      valueString?: string;
      valueDecimal?: number;
      valueAddress?: {
        city: string;
        state: string;
        country: string;
      };
    }>;
    valueString?: string;
    valueCode?: string;
    valueDecimal?: number;
    valueAddress?: {
      city: string;
      state: string;
      country: string;
    };
  }>;
  identifier: Array<{
    system: string;
    value: string;
    type?: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
  }>;
  name: Array<{
    use: string;
    family: string;
    given: string[];
    prefix?: string[];
  }>;
  telecom: Array<{
    system: string;
    value: string;
    use: string;
  }>;
  gender: string;
  birthDate: string;
  address: Array<{
    extension?: Array<{
      url: string;
      extension?: Array<{
        url: string;
        valueDecimal: number;
      }>;
    }>;
    line: string[];
    city: string;
    state: string;
    postalCode?: string;
    country: string;
  }>;
  maritalStatus: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  };
  multipleBirthBoolean: boolean;
  communication: Array<{
    language: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
  }>;
};

type PatientRequest = {
  method: "POST";
  url: "Patient";
};

export interface PatientData {
  fullUrl: string;
  resource: PatientResource;
  request: PatientRequest;
}

export interface PatientType {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  race: string;
  ethnicity: string;
  condition: string[];
  observation: string[];
  encounter: string[];
  allergies: string[];
  procedure: string[];
  medicationRequest: string[];
  medicationAdmin: string[];
  carePlan: string[];
}
