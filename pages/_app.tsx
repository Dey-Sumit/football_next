import { TeamProvider } from '../context/teamContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
   return (
      <TeamProvider>
         <Component {...pageProps} />
      </TeamProvider>
   )
}

export default MyApp
