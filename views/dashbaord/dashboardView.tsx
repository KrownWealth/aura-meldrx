"use client";

import React, { useState, useEffect } from "react";
import { CardWithHeading, DonutChart, InsightsTable, StatsLegend } from "@/components/reusuables";
import PatientCardAlert from "@/components/reusuables/cards/patientCardAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PatientsData } from "@/json";
// import { PatientType } from "@/types";
// import { launchFHIRApp, getFHIRClient } from "@/lib";
// import { useRouter } from "next/navigation";


const statsData = {
  total: 900,
  segments: [
    { label: "Under Care", value: 300, color: "#22c55e" },
    { label: "Unattended", value: 300, color: "#eab308" },
    { label: "Emergency", value: 300, color: "#ef4444" },
  ],
};



const DashboardView = () => {

  // For connectivity
  // const [patients, setPatients] = useState<PatientType[]>([]);
  // const [loading, setLoading] = useState(true);

  // const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const client = await getFHIRClient();
  //       if (!client) {
  //         launchFHIRApp();
  //       }
  //     } catch (error) {
  //       launchFHIRApp(); // Redirect to login if authentication fails
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     try {
  //       const client = await getFHIRClient();
  //       const response = await client.request("Patient?_count=10");
  //       setPatients(response.entry.map((entry: any) => entry.resource));
  //     } catch (error) {
  //       console.error("Error fetching patients:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPatients();
  // }, []);

  // if (loading) {
  //   return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  // }

  return (
    <div className="flex flex-col px-8 space-y-8 mt-8 mb-12">
      <h2 className="text-lg">
        Welcome, <span className="font-semibold">Dr. Alex</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-stretch">

        <CardWithHeading
          heading="Quick Overview"
          description="Prioritize care efficiency at a glance"
          body={
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mt-6">
                <StatsLegend items={statsData.segments} />
              </div>
              <div className="justify-end">
                <DonutChart
                  total={statsData.total}
                  segments={statsData.segments.map(({ color, value }) => ({
                    color,
                    value,
                  }))}
                />
              </div>
            </div>
          }
        />

        {/* Patient Alert Card */}

        <CardWithHeading
          heading="Patient Alert"
          description="Patients requiring immediate attention"
          body={
            <ScrollArea className="h-[200px] px-4 py-2">
              <div className="space-y-4">
                {PatientsData.map((patient) => (
                  <div key={patient.id}>
                    <PatientCardAlert
                      patientName={patient.name}
                      imgSrc={patient.imgSrc}
                      conditions={patient.condition}
                    />
                  </div>
                ))}

                {/* {patients.map((patient) => (
                  <PatientCardAlert
                    key={patient.id}
                    patientName={patient.name}
                    imgSrc="/placeholder.png"
                    conditions={patient.condition ?? []}
                  />
                ))} */}
              </div>
            </ScrollArea>
          }
        />

      </div>

      {/* AI Generated Insights Card */}
      <div>
        <CardWithHeading
          heading="AI Generated Insights"
          description="Personalized AI risk prediction to enhance decision-making "
          body={
            <InsightsTable />
          }
        />
      </div>
    </div>
  );
};

export default DashboardView;
