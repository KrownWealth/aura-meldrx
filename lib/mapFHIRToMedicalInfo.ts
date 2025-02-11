import { FHIRSampleData } from "@/json";
import type { MedicalInformation } from "@/types/medical-info";

export const mapFHIRToMedicalInfo = (fhirData: any): MedicalInformation => {
  return {
    basicInformation: {
      name: `${fhirData.name[0].given.join(" ")} ${fhirData.name[0].family}`,
      gender:
        fhirData.gender.charAt(0).toUpperCase() + fhirData.gender.slice(1),
      birthDate: fhirData.birthDate,
      address: fhirData.address
        .map(
          (addr: any) =>
            `${addr.line.join(", ")}, ${addr.city}, ${addr.state} ${
              addr.postalCode
            }, ${addr.country}`
        )
        .join("; "),
      phone:
        fhirData.telecom.find((contact: any) => contact.system === "phone")
          ?.value || "N/A",
      email:
        fhirData.telecom.find((contact: any) => contact.system === "email")
          ?.value || "N/A",
    },
    managingOrganization: {
      name: fhirData.managingOrganization.display,
    },
    conditions: fhirData.condition.map((cond: any) => ({
      name: cond.code.text,
      status: cond.clinicalStatus,
      onset: cond.onsetDateTime || undefined,
      abatement: cond.abatementDateTime || undefined,
    })),
    vitals: {
      bloodPressure: fhirData.vitalSigns.bloodPressure,
      heartRate: fhirData.vitalSigns.heartRate,
      weight: fhirData.vitalSigns.weight,
      height: fhirData.vitalSigns.height,
    },
    allergies: fhirData.allergyIntolerance.map((allergy: any) => ({
      name: allergy.code.text,
      status: allergy.clinicalStatus,
    })),
    medications: fhirData.medicationRequest.map((medication: any) => ({
      name: medication.medicationCodeableConcept.text,
      status: medication.status,
      dosage: medication.dosageInstruction
        .map((dosage: any) => dosage.text)
        .join(", "),
    })),
  };
};
