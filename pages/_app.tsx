import {  GeistProvider } from "@geist-ui/react"

function MyApp({ Component, pageProps }) {
  return <GeistProvider><Component {...pageProps} /></GeistProvider>
}

export default MyApp
