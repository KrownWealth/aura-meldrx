import { toSlug } from "./toSlug";
import { mapFHIRToMedicalInfo } from "./mapFHIRToMedicalInfo";
import { cn } from "./utils";
import { calculateAge } from "./calculateAge";
import { extractPatient, extractPatients } from "./extractedData";
import { getFHIRClient, launchFHIRApp } from "./fhirClient";
import AuthProvider from "./authProvider";

export {
  toSlug,
  mapFHIRToMedicalInfo,
  cn,
  calculateAge,
  extractPatient,
  extractPatients,
  launchFHIRApp,
  getFHIRClient,
  AuthProvider,
};
