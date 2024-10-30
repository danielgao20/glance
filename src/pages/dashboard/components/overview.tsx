import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'

const data = [
  { name: 'Mon', Josephine: 8, David: 5, Jon: 7, Daniel: 6 },
  { name: 'Tue', Josephine: 6, David: 7, Jon: 5, Daniel: 8 },
  { name: 'Wed', Josephine: 9, David: 4, Jon: 6, Daniel: 5 },
  { name: 'Thu', Josephine: 7, David: 8, Jon: 9, Daniel: 7 },
  { name: 'Fri', Josephine: 5, David: 6, Jon: 8, Daniel: 9 },
]

// Muted modern colors
const COLORS = ['#4E5D78', '#637381', '#9AA5B1', '#ADB5BD']

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis 
          dataKey="name" 
          stroke="#B0B3B8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#B0B3B8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', border: 'none' }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
        />
        <Legend iconType="circle" wrapperStyle={{ color: '#B0B3B8' }} />

        {['Josephine', 'David', 'Jon', 'Daniel'].map((member, index) => (
          <Bar
            key={member}
            dataKey={member}
            fill={COLORS[index]}
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                fillOpacity={0.85}
                cursor="pointer"
                style={{ transition: 'fill-opacity 0.3s ease' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.fillOpacity = '1')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.fillOpacity = '0.85')}
              />
            ))}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
