// types/healthcareTypes.ts

// Bundle Interface
export interface Bundle {
  resourceType: string;
  type: string;
  entry: Entry[];
}

// Entry Interface
interface Entry {
  fullUrl: string;
  resource: Practitioner; // Referring to the Practitioner interface below
  request: Request;
}

// Meta Interface
interface Meta {
  profile: string[];
}

// Extension Interface
interface Extension {
  url: string;
  valueInteger?: number;
  valueBoolean?: boolean;
}

// Identifier Interface
interface Identifier {
  system: string;
  value: string;
}

// Name Interface
interface Name {
  family: string;
  given: string[];
  prefix?: string[];
}

// Telecom Interface
interface Telecom {
  extension?: Extension[];
  system: string;
  value: string;
  use: string;
}

// Address Interface
interface Address {
  line: string[];
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Request Interface
interface Request {
  method: string;
  url: string;
  ifNoneExist?: string; // Optional, as it may not always be present
}

// Practitioner Interface
export interface Practitioner {
  resourceType: string;
  id: string;
  meta: Meta;
  extension: Extension[];
  identifier: Identifier[];
  active: boolean;
  name: Name[];
  telecom: Telecom[];
  address: Address[];
  gender: string;
}
