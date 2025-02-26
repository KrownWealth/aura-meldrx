"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PatientType } from "@/types";

const InsightsTable: React.FC = () => {
  const [patients, setPatients] = useState<PatientType[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/patients`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch patient data:", response.status);
          return;
        }

        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <ScrollArea className="h-[400px] px-4 py-2">
      <Table className="border border-border">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Patient ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Risk Alert</TableHead>
            <TableHead>AI Prediction</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>
                <Link
                  href={`/patients/${patient.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>Sugar level high</TableCell>
              <TableCell>Patient needs urgen attention</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoveVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/patients/${patient.id}`}>View Details</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default InsightsTable;
