import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const MAKER_COLORS = [
  '#FFC312',
  '#C4E538',
  '#12CBC4',
  '#FDA7DF',
  '#ED4C67',
  '#F79F1F',
  '#A3CB38',
  '#1289A7',
  '#D980FA',
  '#B53471',
]

const AGE_COLORS = [
  '#EE5A24',
  '#009432',
  '#0652DD',
  '#9980FA',
  '#833471',
  '#EA2027',
  '#006266',
  '#1B1464',
  '#5758BB',
  '#6F1E51',
]

const ageRanges = [
  { label: '25-30', value: '25-30' },
  { label: '30-35', value: '30-35' },
  { label: '35-40', value: '35-40' },
  { label: '40-45', value: '40-45' },
  { label: '45-50', value: '45-50' },
  { label: '50-55', value: '50-55' },
  { label: '55-60', value: '55-60' },
  { label: '60-65', value: '60-65' },
  { label: '65-70', value: '65-70' },
  { label: '70-75', value: '70-75' },
  { label: '75-80', value: '75-80' },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  value,
  index,
}) => {
  const valueRadius = innerRadius + (outerRadius - innerRadius) * 0.75
  const valueX = cx + valueRadius * Math.cos(-midAngle * RADIAN)
  const valueY = cy + valueRadius * Math.sin(-midAngle * RADIAN)

  const nameRadius = innerRadius + (outerRadius - innerRadius) * 1.1
  const nameX = cx + nameRadius * Math.cos(-midAngle * RADIAN)
  const nameY = cy + nameRadius * Math.sin(-midAngle * RADIAN)

  return (
    <>
      <text
        x={valueX}
        y={valueY}
        fill='white'
        textAnchor={valueX > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {value}
      </text>
      <text
        x={nameX}
        y={nameY}
        fill='#ccccc'
        textAnchor={nameX > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {name}
      </text>
    </>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        <p>{`${payload[0].name}: ${payload[0].value} cars`}</p>
        <p>{`${payload[0].payload.models.length} Models:`}</p>
        <ul style={{ maxHeight: 400, overflow: 'auto' }}>
          {payload[0].payload.models.map((model) => (
            <li>{model}</li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}

const initialAgeRange = ageRanges[0].value

const CarPieChart = ({ users }) => {
  const [ageRange, setAgeRange] = useState(initialAgeRange)

  const filterData = (range) =>
    users.filter(
      (user) =>
        user.age >= Number(range.split('-')[0]) &&
        user.age <= Number(range.split('-')[1])
    )
  const filteredData = filterData(ageRange)

  const groupByMakerAndModels = (users) =>
    users.reduce((result, user) => {
      const { make, model } = user.vehicle
      if (!result[make]) {
        result[make] = { name: make, value: 1, models: [model] }
      } else {
        result[make].value++
        if (!result[make].models.includes(model)) {
          result[make].models.push(model)
        }
      }
      return result
    }, {})

  const makers = groupByMakerAndModels(filteredData)

  const groupByAge = (users) =>
    users.reduce((result, user) => {
      const { age } = user.vehicle
      if (!result[age]) {
        result[age] = { name: `${age} years`, value: 1 }
      } else {
        result[age].value++
      }
      return result
    }, {})

  const ages = groupByAge(filteredData)

  const handleAgeRangeChange = (event) => setAgeRange(event.target.value)

  return (
    <div>
      <div style={{ display: 'flex', gap: '100px' }}>
        <div>
          <h2>Car Maker Chart</h2>
          <ResponsiveContainer width={600} height={600}>
            <PieChart>
              <Pie
                data={Object.values(makers)}
                dataKey='value'
                nameKey='name'
                label={renderCustomizedLabel}
                labelLine={false}
                cx='50%'
                cy='50%'
                outerRadius={200}
                fill='#8884d8'
              >
                {Object.values(makers).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`${MAKER_COLORS[index % MAKER_COLORS.length]}`}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Car Age Chart</h2>
          <ResponsiveContainer width={600} height={600}>
            <PieChart>
              <Pie
                data={Object.values(ages)}
                dataKey='value'
                nameKey='name'
                label={renderCustomizedLabel}
                labelLine={false}
                cx='50%'
                cy='50%'
                outerRadius={200}
                fill='#8884d8'
              >
                {Object.values(ages).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`${AGE_COLORS[index % AGE_COLORS.length]}`}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <h2>Car Maker Filter</h2>
      <div>
        {ageRanges.map((range) => (
          <label key={range.value}>
            <input
              type='radio'
              name='age-range'
              value={range.value}
              checked={ageRange === range.value}
              onChange={handleAgeRangeChange}
            />
            {range.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default CarPieChart
