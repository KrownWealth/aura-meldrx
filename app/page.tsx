import React from 'react'
import { DashboardView } from '@/views'
import { DashboardHeader } from '@/components/reusuables'


const Dashboard = () => {
  return (
    <div className="">
      <DashboardHeader title="Dashbaord" />
      <DashboardView />
    </div>
  )

}

export default Dashboard
