import React from 'react'
import { Radar } from 'react-chartjs-2'
import useSWR from 'swr'

const Chart = ({
   labels,
   home_team_data,
   away_team_data,
   home_team_name,
   away_team_name,
}) => {
   const data = {
      labels: labels,
      datasets: [
         {
            label: away_team_name,
            data: away_team_data,
            borderColor: 'rgba(181, 137, 254, 1)',
            backgroundColor: 'rgba(181, 137, 254, 0.4)',
         },
         {
            label: home_team_name,
            data: home_team_data,
            borderColor: 'rgba(5, 212, 113, 1)',
            backgroundColor: 'rgba(5, 212, 113, 0.8)',
         },
      ],
   }
   const options = {
      scale: {
         angleLines: {
            color: 'rgba(255,255,255,0.8)', // lines radiating from the center
         },
         gridLines: {
            color: 'rgba(255,255,255,0.8)',
         },
         pointLabels: {
            fontSize: 16,
            fontColor: '#fff',
         },
      },

      legend: {
         labels: {
            // This more specific font property overrides the global property
            fontColor: '#fff',
            fontSize: 14,
         },
      },
      responsive: true,
      maintainAspectRatio: false,
   }
   return <Radar data={data} options={options} />
}
//TODO add type script
const Prediction = ({ fixture_id }) => {
   const { data } = useSWR(`predictions/${fixture_id}`, {
      dedupingInterval: 2000,
   })
   const predictions = data?.api?.predictions[0]

   var labels: string[] = [],
      home_team_data = [],
      away_team_data = [],
      home_team_name,
      away_team_name

   if (predictions) {
      home_team_name = predictions.teams.home.team_name
      away_team_name = predictions.teams.away.team_name

      for (let o in predictions.comparison) {
         labels.push(o)
         home_team_data.push(parseInt(predictions.comparison[o].home))
         away_team_data.push(parseInt(predictions.comparison[o].away))
      }
      labels.push('win')
      home_team_data.push(parseInt(predictions.winning_percent.home))
      away_team_data.push(parseInt(predictions.winning_percent.away))
   }

   return predictions ? (
      <div style={{ height: '45vh' }}>
         <Chart
            labels={labels}
            home_team_data={home_team_data}
            away_team_data={away_team_data}
            home_team_name={home_team_name}
            away_team_name={away_team_name}
         />
      </div>
   ) : (
      <h1>Loading...</h1>
   )
}

export default Prediction
