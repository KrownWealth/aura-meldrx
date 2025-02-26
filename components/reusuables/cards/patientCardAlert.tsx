import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'


interface CardProps {
  imgSrc: string
  patientName: string
  conditions: string
}

const PatientCardAlert: React.FC<CardProps> = ({ imgSrc, patientName, conditions }) => {
  return (
    <div className="w-full">
      <Card className="flex items-center p-2 space-x-6">
        <Avatar className="border">
          <AvatarImage src={imgSrc} alt={patientName} />
          <AvatarFallback>{patientName.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <CardHeader className="flex flex-col p-2">
          <CardTitle className="font-semibold text-lg">{patientName}</CardTitle>
          <CardDescription>
            Conditions: <span>{conditions}</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default PatientCardAlert
