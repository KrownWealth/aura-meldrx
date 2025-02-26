import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { extractPatients } from "@/lib";

const jsonDirectory = path.join(process.cwd(), "json/patientsFHIRBundles");

export async function GET() {
  try {
    const files = await fs.readdir(jsonDirectory);
    let allPatients: any[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(jsonDirectory, file);
        const fileContents = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileContents);

        allPatients = [...allPatients, ...extractPatients(jsonData)];
      }
    }

    return NextResponse.json(allPatients);
  } catch (error) {
    console.error("Error loading patient data:", error);
    return NextResponse.json(
      { error: "Failed to load patient data" },
      { status: 500 }
    );
  }
}

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const count = url.searchParams.get("count") || "50";

//     // Fetch multiple patients
//     const patientResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_HAPI_FHIR_SERVER}/Patient?_count=${count}`
//     );
//     if (!patientResponse.ok) throw new Error("Failed to fetch patients");

//     const patientBundle = await patientResponse.json();
//     const patients = patientBundle.entry || [];

//     if (patients.length === 0) {
//       return NextResponse.json({ message: "No patients found" });
//     }

//     // Extract patient IDs
//     const patientIds = patients.map((p: any) => p.resource.id);

//     // Fetch related resources for all patients
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

//     const allResources = await Promise.all(
//       resourceTypes.map(async (type) => {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_HAPI_FHIR_SERVER}/${type}?_count=100`
//         );
//         return res.ok ? await res.json() : { entry: [] };
//       })
//     );

//     // Merge patient and related resources into a FHIR bundle
//     const fhirBundle = {
//       resourceType: "Bundle",
//       entry: [...patients, ...allResources.flatMap((r) => r.entry || [])],
//     };

//     // Extract structured patient data for each patient
//     const structuredPatients = patientIds.map((patientId: string) =>
//       extractPatient(fhirBundle, patientId)
//     );

//     return NextResponse.json(structuredPatients);
//   } catch (error) {
//     console.error("Error fetching bulk patients:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch bulk patient data" },
//       { status: 500 }
//     );
//   }
// }
