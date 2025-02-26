import React from 'react'
import { PatientsView } from '@/views'
import { DashboardHeader } from '@/components/reusuables'


const Patient = () => {
  return (
    <div className="">
      <DashboardHeader title="All Patients" />
      <PatientsView />
    </div>
  )

}

export default Patient
