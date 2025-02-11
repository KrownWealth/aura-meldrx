"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader, MedicalRecord, ReusableTabs } from "@/components/reusuables";
import { PatientType } from "@/types";


const tabsData = [
  { title: "Prediction", content: ["High risk of diabetes", "Possible hypertension"] },
  { title: "Classification", content: ["Type 2 Diabetes", "Pre-hypertension"] },
  { title: "Recommendation", content: ["Increase physical activity", "Reduce sodium intake"] },
] as const;

const PatientView = ({ params }: { params: { id: string } }) => {
  const [patient, setPatient] = useState<PatientType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        console.log("Fetching patient data for ID:", params.id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to fetch patient data: ${res.status}`);

        const data: PatientType = await res.json();
        setPatient(data);
      } catch (error) {
        console.error(error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [params.id, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading patient data...</p>;
  }

  if (!patient) {
    return <p className="text-center mt-10">Patient not found.</p>;
  }

  return (
    <>
      <div className="flex flex-col space-y-8 px-8 mt-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">{patient.name}</h2>

        {/* Patient Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p><strong>ID:</strong> {patient.id}</p>
            <p><strong>Gender:</strong> {patient.gender || "Unknown"}</p>
            <p><strong>Birth Date:</strong> {patient.birthDate || "Not Available"}</p>
            <p><strong>Conditions:</strong> {patient.condition?.length ?? 0}</p>
            <p><strong>Observations:</strong> {patient.observation?.length ?? 0}</p>
          </div>
          <div>
            <p><strong>Encounters:</strong> {patient.encounter?.length ?? 0}</p>
            <p><strong>Allergies:</strong> {patient.allergies?.length ?? 0}</p>
            <p><strong>Procedures:</strong> {patient.procedure?.length ?? 0}</p>
            <p><strong>Medications Requested:</strong> {patient.medicationRequest?.length ?? 0}</p>
            <p><strong>Medications Administered:</strong> {patient.medicationAdmin?.length ?? 0}</p>
            <p><strong>Care Plans:</strong> {patient.carePlan?.length ?? 0}</p>
          </div>
        </div>

        {/* Tabs Section */}
        <ReusableTabs tabsData={tabsData} />

        {/* Accordion Section for Detailed Records */}
        <div>
          <MedicalRecord title="Conditions" content={patient.condition || ["No Data"]} />
          <MedicalRecord title="Observations" content={patient.observation || ["No Data"]} />
          <MedicalRecord title="Encounters" content={patient.encounter || ["No Data"]} />
          <MedicalRecord title="Allergies" content={patient.allergies || ["No Data"]} />
          <MedicalRecord title="Procedures" content={patient.procedure || ["No Data"]} />
          <MedicalRecord title="Medications Requested" content={patient.medicationRequest || ["No Data"]} />
          <MedicalRecord title="Medications Administered" content={patient.medicationAdmin || ["No Data"]} />
          <MedicalRecord title="Care Plans" content={patient.carePlan || ["No Data"]} />
        </div>
      </div>
    </>
  );
};

export default PatientView;
