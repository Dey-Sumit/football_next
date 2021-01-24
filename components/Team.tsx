import { FunctionComponent } from 'react'
import { SET_MY_TEAM } from '../context/actionTypes'
import { useTeamDispatch } from '../context/teamContext'
import { team } from '../types'

const Team: FunctionComponent<{
   team: team
   showName?: boolean
   largeLogo?: boolean
}> = ({ team, showName, largeLogo }) => {
   const dispatch = useTeamDispatch()
   const updateMyTeam = () => {
      // if (closeSearch)
      //     closeSearch();

      dispatch(SET_MY_TEAM, team)
   }
   const { logo, name, team_id } = team

   const logoClass = largeLogo ? 'logo-large' : 'logo-medium'
   return (
      <div
         className='flex items-center justify-center p-5 text-center rounded-lg cursor-pointer boxShadow'
         onClick={updateMyTeam}>
         {/* //TODO NEXT IMAGE */}
         <img src={logo} alt='' className={logoClass} />
         {showName && <span className='mt-2 team__name'>{name}</span>}
      </div>
   )
}

export default Team
