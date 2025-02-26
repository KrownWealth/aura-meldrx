import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { extractPatient } from "@/lib";

const jsonDirectory = path.join(process.cwd(), "json/patientsFHIRBundles");

// Local data
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const files = await fs.readdir(jsonDirectory);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(jsonDirectory, file);
        const fileContents = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileContents);

        const extractedData = extractPatient(jsonData, id);

        if (extractedData) {
          return NextResponse.json(extractedData, { status: 200 });
        }
      }
    }

    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Fetched Data

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     const patientResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_HAPI_FHIR_SERVER}/Patient/${id}`
//     );
//     if (!patientResponse.ok) throw new Error("Failed to fetch patient data");

//     const patientData = await patientResponse.json();

//     // Fetch related resources
//     const resourceTypes = [
//       "Condition",
//       "Observation",
//       "Encounter",
//       "AllergyIntolerance",
//       "MedicationRequest",
//       "MedicationAdministration",
//       "Procedure",
//       "CarePlan",
//     ];

//     const relatedResources = await Promise.all(
//       resourceTypes.map(async (type) => {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_HAPI_FHIR_SERVER}/${type}?subject=Patient/${id}`
//         );
//         return res.ok ? await res.json() : { entry: [] };
//       })
//     );

//     // Merge patient and related resources into a FHIR bundle
//     const fhirBundle = {
//       resourceType: "Bundle",
//       entry: [
//         { resource: patientData },
//         ...relatedResources.flatMap((r) => r.entry || []),
//       ],
//     };

//     // Extract structured patient data
//     const extractedPatientData = extractPatient(fhirBundle, id);

//     return NextResponse.json(extractedPatientData);
//   } catch (error) {
//     console.error("Error fetching patient data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch patient data" },
//       { status: 500 }
//     );
//   }
// }
