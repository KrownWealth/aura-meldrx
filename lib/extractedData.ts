import { PatientType } from "@/types";
import { calculateAge } from "@/lib";

// Extract unique values from resources
const extractUniqueValues = (resources: any[], keyPath: string[]): string[] => {
  return resources
    .map(
      (res) => keyPath.reduce((acc, key) => acc?.[key], res.resource) || "N/A"
    )
    .filter((text: string) => text !== "N/A")
    .filter(
      (text: string, index: number, arr: string[]) =>
        arr.indexOf(text) === index
    );
};

// Extract a single patient by ID
export const extractPatient = (
  bundle: any,
  patientId: string
): PatientType | null => {
  if (!bundle || !Array.isArray(bundle.entry)) {
    console.error("Invalid FHIR bundle:", bundle);
    return null;
  }

  const patient = bundle.entry.find(
    (entry: any) =>
      entry.resource?.resourceType === "Patient" &&
      entry.resource?.id === patientId
  );

  if (!patient) return null;

  const patientRefOptions = [`urn:uuid:${patientId}`, `Patient/${patientId}`];

  return {
    id: patientId,
    name: `${patient.resource.name?.[0]?.given?.join(" ") || ""} ${
      patient.resource.name?.[0]?.family || ""
    }`.trim(),
    gender: patient.resource.gender || "N/A",
    birthDate: patient.resource.birthDate || "N/A",
    age:
      patient.resource.birthDate !== "N/A"
        ? calculateAge(patient.resource.birthDate)
        : 0,
    race:
      patient.resource.extension?.find((ext: any) =>
        ext.url.includes("us-core-race")
      )?.extension?.[0]?.valueCoding?.display || "N/A",
    ethnicity:
      patient.resource.extension?.find((ext: any) =>
        ext.url.includes("us-core-ethnicity")
      )?.extension?.[0]?.valueCoding?.display || "N/A",
    condition: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "Condition" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["code", "text"]
    ),
    observation: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "Observation" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["valueCodeableConcept", "text"]
    ),
    allergies: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "AllergyIntolerance" &&
          patientRefOptions.includes(e.resource?.patient?.reference)
      ),
      ["code", "text"]
    ),
    medicationRequest: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "MedicationRequest" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["medicationCodeableConcept", "text"]
    ),
    encounter: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "Encounter" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["type", "0", "text"]
    ),
    procedure: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "Procedure" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["code", "coding", "0", "display"]
    ),
    medicationAdmin: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "MedicationAdministration" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["medicationCodeableConcept", "text"]
    ),
    carePlan: extractUniqueValues(
      bundle.entry.filter(
        (e: any) =>
          e.resource?.resourceType === "CarePlan" &&
          patientRefOptions.includes(e.resource?.subject?.reference)
      ),
      ["text", "div"]
    ),
  };
};

// Extract all patients from the bundle
export const extractPatients = (bundle: any) => {
  if (!bundle || !Array.isArray(bundle.entry)) {
    console.error("Invalid FHIR bundle:", bundle);
    return [];
  }

  return bundle.entry
    .filter((entry: any) => entry.resource?.resourceType === "Patient")
    .map((entry: any) => extractPatient(bundle, entry.resource.id));
};
