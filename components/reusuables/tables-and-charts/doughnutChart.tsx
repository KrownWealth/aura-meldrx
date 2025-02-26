interface DonutChartProps {
  total: number
  segments: {
    color: string
    value: number
  }[]
}

export function DonutChart({ total, segments }: DonutChartProps) {
  // Calculate total circumference
  const circumference = 2 * Math.PI * 40
  let offset = 0

  return (
    <div className="relative aspect-square w-[200px] mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {segments.map((segment, index) => {
          const dashArray = (segment.value / total) * circumference
          const currentOffset = offset
          offset -= dashArray

          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              strokeDasharray={`${dashArray} ${circumference - dashArray}`}
              strokeDashoffset={currentOffset}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <div className="text-sm text-muted-foreground">Patients</div>
        <div className="text-3xl font-bold">{total}</div>
      </div>
    </div>
  )
}

