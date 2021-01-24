import { TeamProvider } from '../context/teamContext'
import '../styles/globals.css'
import axios from 'axios'
import { FOOTBALL_API_KEY } from '../secrets'
import { SWRConfig } from 'swr'

axios.defaults.baseURL = 'https://v2.api-football.com/'
axios.defaults.headers.common['X-RapidAPI-Key'] = FOOTBALL_API_KEY

const fetcher = async (url: string) => {
   try {
      const res = await axios(url)
      return res.data
   } catch (error) {
      throw error.response.data
   }
}
function MyApp({ Component, pageProps }) {
   return (
      <SWRConfig value={{ fetcher }}>
         <TeamProvider>
            <Component {...pageProps} />
         </TeamProvider>
      </SWRConfig>
   )
}

export default MyApp
