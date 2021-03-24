import { gql } from '@apollo/client'
import { shopify } from './apis.service'
import { ProductQueryVariables } from '../models'

const PRODUCT_FRAGMENT = gql`
  fragment product on Product {
    title
    description
    images(first: 1) {
      edges {
        node {
          altText
          transformedSrc
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  ${PRODUCT_FRAGMENT}
  query product($handle: String!) {
    productByHandle(handle: $handle) {
      ...product
    }
  }
`

export const get = async (variables: ProductQueryVariables) => {
  const { loading, error, data } = await shopify.query({
    query: PRODUCT_QUERY,
    variables
  })

  return { loading, error, data }
}

