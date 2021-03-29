import { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://siri-shop-123.myshopify.com/api/2021-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': 'cd94bd383d8460e9be5ffc4dd2c855d4',
      'Content-Type': 'application/json',
    },
  }),

  cache: new InMemoryCache()
})

const  MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>ABC Inc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
