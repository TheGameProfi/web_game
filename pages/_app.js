import '../styles/globals.css'
import '../css/leaderboard.css'
import '../css/login.css'
import { SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
