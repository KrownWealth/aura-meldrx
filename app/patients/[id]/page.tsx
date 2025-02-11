import { DashboardHeader } from '@/components/reusuables'
import { PatientView } from '@/views'
import React from 'react'

const Patient = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <DashboardHeader title="Patient" />
      <PatientView params={params} />
    </>
  )
}

export default Patient
