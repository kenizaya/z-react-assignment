import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const UserBarChart = ({ users }) => {
  const countryCounts = {}
  users.forEach((user) => {
    if (user.address.country in countryCounts) {
      countryCounts[user.address.country]++
    } else {
      countryCounts[user.address.country] = 1
    }
  })

  const data = Object.entries(countryCounts).map(([country, count]) => ({
    name: country,
    count,
  }))

  return (
    <BarChart
      width={650}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Bar dataKey='count' fill='#2186EB' />
    </BarChart>
  )
}

export default UserBarChart
