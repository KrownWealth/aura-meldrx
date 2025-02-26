import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { ReactNode } from 'react'


interface CardProps {
  heading: string
  description?: string
  body: ReactNode
}
const CardWithHeading: React.FC<CardProps> = ({ heading, description, body }) => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize font-semibold text-lg">{heading}</CardTitle>
          <CardDescription className="text-foreground text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent>{body}</CardContent>
      </Card>
    </div>
  )
}

export default CardWithHeading
