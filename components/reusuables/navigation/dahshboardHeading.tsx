
import React from 'react'


const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <>
      <div className="p-6 border-b flex justify-between">
        <h2 className="font-bold text-2xl">{title}</h2>

      </div>
      {/* <hr className="w-full" /> */}
    </>
  )
}

export default DashboardHeader
