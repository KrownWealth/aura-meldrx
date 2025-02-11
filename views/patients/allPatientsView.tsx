"use client"

import { InsightsTable, SearchInput } from "@/components/reusuables";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { PatientType } from "@/types";
import { DashboardHeader } from "@/components/reusuables";
import { useEffect, useState } from "react";

const PatientsView = async () => {


  return (
    <div className="flex flex-col space-y-8 px-8 mt-8 mb-12">
      <Card className="flex flex-row p-4 justify-between">
        <div className="w-3/5">
          <SearchInput placeholder="Search for patient here..." />
        </div>
        <div>
          <Button className="font-semibold text-lg bg-auraGreen text-white">
            <ListFilter className="w-12 h-12 font-bold" />
            Filter
          </Button>
        </div>
      </Card>
      <Card className="p-6">
        <CardHeader>
          <CardTitle>View All Patients</CardTitle>
        </CardHeader>
        <InsightsTable />
      </Card>
    </div>
  );
};

export default PatientsView;
