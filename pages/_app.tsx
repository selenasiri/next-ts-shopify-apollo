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
    uri: `https://the-sun-shop-partners.myshopify.com/api/2021-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': 'e178b48df350961056582af5b458a10d',
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
