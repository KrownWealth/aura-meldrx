interface StatsLegendProps {
  items: {
    label: string
    value: number
    color: string
  }[]
}

export function StatsLegend({ items }: StatsLegendProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-8 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

