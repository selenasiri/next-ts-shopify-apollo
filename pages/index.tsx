import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link'

interface ProductNode {
  handle: string;
  title: string;
  description: string;
}

const getProducts = gql`
  query getProducts($first22: Int!) {
    products(first: $first22) {
      edges {
        node {
          handle
          title
          description
        }
      }
    }
  }
`

const Home = () => {
  const { loading, error, data } = useQuery(getProducts, {
      variables: { first22: 5},
    });

  if (loading) return <p>Loading ...</p>
  if (error) return <p>error :)</p>

  const products: ProductNode[] = data.products.edges.map((edge: { node: ProductNode }) => edge.node)
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Head>
          <title>ABC Inc | Products</title>
        </Head>

        <h1>Products</h1>
        
        <ul>
          {products.map(({title, handle, description }) => (
            <li key={handle}>
              <Link href={`/products/${handle}`}>
                <a>{title}</a>
              </Link>
              <p>{description}</p>
            </li>
            ))
          }
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Home
