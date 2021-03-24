import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { ProductFragment } from '../../models'
import services from '../../services'
import styles from '../../styles/Home.module.css'

interface ProductProps {
    product: ProductFragment
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { title, description } = product
  return (
    <div className={styles.container}>
      <Head>
        <title>{`ABC Inc | ${title}`}</title>
      </Head>

      <h1>{title}</h1>
      <p>{description}</p>

      <Link href={`/`}>
        <a><h3>Back Home</h3></a>
      </Link>
    </div> 
  )
}

export const getServerSideProps: GetServerSideProps  = async (context) => {
    const { query } = context;
    const { data } = await services.product.get({ handle: query.handle as string})
  
    console.log(data)

    if (!data || !data.productByHandle) {
        return {
          notFound: true,
        }
    }

    return {
      props: {
        product: data.productByHandle,
      }
    }
  }

export default Product

/* data:
{
  productByHandle: {
    title: 'LED High Tops',
    description: 'Black high top shoes with green LED lights in the sole, tied up with laces and a buckle.', 
    images: { edges: [Array], __typename: 'ImageConnection' },
    options: [ [Object] ],
    variants: { edges: [Array], __typename: 'ProductVariantConnection' },
    __typename: 'Product'
  }
}
*/