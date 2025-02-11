"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionProps {
  title: string;
  content: string[];
}

const MedicalRecord: React.FC<AccordionProps> = ({ title, content }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 mt-4">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MedicalRecord;
