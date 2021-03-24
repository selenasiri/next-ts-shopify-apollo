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
    uri: `https://yinglu91-app2.myshopify.com/api/2021-01/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': '81bb4a22b3bd5bea0f9db968354bc66c',
      'Content-Type': 'application/graphql',
    }
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
