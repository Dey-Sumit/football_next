import React, { FunctionComponent } from 'react'

const StatsBar: FunctionComponent<{
   data: { home: any; away: any }
   text: string
}> = ({ data: { home, away }, text }) => {
   home = parseInt(home)
   away = parseInt(away)

   const total = home + away

   const homeBarWidth = (100 / total) * home
   const awayBarWidth = Math.floor((100 / total) * away)

   var homeBarClass: string, awayBarClass: string

   //TODO refractor the colors
   if (homeBarWidth > awayBarWidth) {
      homeBarClass =
         'statsBar__home gradient-blue py-1 px-4  rounded-full text-right ml-auto'
      awayBarClass = 'statsBar__away gradient-gray2 py-1 px-4 rounded-full'
   } else {
      awayBarClass = 'statsBar__away gradient-green py-1 px-4 rounded-full'
      homeBarClass =
         'statsBar__home gradient-gray2 py-1 px-4 rounded-full text-right ml-auto'
   }

   return (
      <div className='flex flex-col p-3 text-white'>
         <p className='mb-2 text-center'>{text}</p>
         <div className='grid grid-cols-2 gap-3'>
            <div className='text-left rounded-full gradient-gray '>
               <div
                  className={homeBarClass}
                  style={{ width: `${homeBarWidth}%` }}>
                  {home}
               </div>
            </div>
            <div className='text-left rounded-full gradient-gray'>
               <div
                  className={awayBarClass}
                  style={{ width: `${awayBarWidth}%` }}>
                  {away}
               </div>
            </div>
         </div>
      </div>
   )
}

const Stats = ({ stats }) => {
   return stats ? (
      <div>
         <StatsBar data={stats['Ball Possession']} text='Possession' />
         <StatsBar data={stats['Passes %']} text='Passes %' />
         <StatsBar data={stats['Total passes']} text='Total Passes' />
         <StatsBar data={stats['Total Shots']} text='Total Shots' />
         <StatsBar data={stats['Yellow Cards']} text='Yellow Cards' />
         <StatsBar data={stats['Corner Kicks']} text='Corner Kicks' />
      </div>
   ) : (
      <h1>Bar Loading...</h1>
   )
}

export default Stats
