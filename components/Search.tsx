import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'
import useSWR from 'swr'
import { team } from '../types'
import Team from './Team'

const Search: FunctionComponent<{ title: string }> = ({ title }) => {
   const [searchTerm, setSearchTerm] = useState<string>('')
   const [openSearch, setOpenSearch] = useState<boolean>(false)
   // null means the search is not yet started ; []  means searched but got no results
   const [searchResults, setSearchResults] = useState<team[]>(null)
   const [loading, setLoading] = useState(false)
   const [timer, setTimer] = useState(null)

   //    const { data } = useSWR(`teams/search/${searchTerm}`, {
   //       dedupingInterval: 2000,
   //    })
   //    setSearchResults(data || [])

   let searchBoxClass = openSearch ? 'opacity-1 visible' : 'opacity-0 invisible'
   useEffect(() => {
      // TODO handle empty string;reset the array
      if (searchTerm.length >= 4) {
         searchTeam()
      }
   }, [searchTerm])

   const searchTeam = async () => {
      //! don't mess with swr global config just for this single request
      // add delay
      clearTimeout(timer)
      setTimer(
         setTimeout(async () => {
            setLoading(true)
            const { data } = await axios(`teams/search/${searchTerm}`)

            //TODO axios transform response
            console.log(data.api.teams)
            setSearchResults(data.api.teams)
            setLoading(false)
         }, 300)
      )
   }

   return (
      <div className='my-5 text-green'>
         <button
            className='flex items-center justify-center w-full py-4 text-lg rounded-full px-7 boxShadow-inset focus:outline-none'
            onClick={() => setOpenSearch(true)}>
            {title} <FaSearch className='ml-4' />
         </button>
         {/* //TODO use classnames */}
         <div
            className={`fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-dark transition duration-500 ${searchBoxClass}`}>
            <input
               type='text'
               placeholder='Start typing eg: Ajax'
               value={searchTerm}
               className='p-3 text-xl text-white bg-transparent border-b-2 focus:outline-none border-green'
               onChange={e => setSearchTerm(e.target.value)}
            />
            <FaTimesCircle
               size={40}
               className='fixed cursor-pointer top-16 right-16'
               onClick={() => setOpenSearch(false)}
            />
            {/* show the results here */}
            {/* //TODO handle responsiveness of this part */}
            <div className='flex mt-4 space-x-4'>
               {loading
                  ? 'Loading....' //   TODO ADD SKELETONS
                  : searchResults
                       ?.slice(0, 5)
                       .map(team => (
                          <Team
                             key={team.team_id}
                             closeSearch={() => setOpenSearch(false)}
                             team={team}
                             showName
                          />
                       ))}
               {!loading && searchResults?.length === 0 ? (
                  <h5>No Team Found; check the team name :)</h5>
               ) : null}
            </div>
         </div>
      </div>
   )
}

export default Search
