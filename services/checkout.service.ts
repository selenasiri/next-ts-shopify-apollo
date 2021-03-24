import { gql } from '@apollo/client'

export const CHECKOUT_FRAGMENT = gql`
  fragment checkout on Checkout {
    id
    webUrl
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              transformedSrc
            }
            priceV2 {
              amount
              currencyCode
            }
          }
          quantity
        }
      }
    }
  }
`

const CHECKOUT_CREATE_MUTATION = gql`
  mutation checkoutCreate {
    checkoutCreate(input: {}) {
      checkout {
        id
      }
    }
  }
`;

const CHECKOUT_QUERY = gql`
  ${CHECKOUT_FRAGMENT}
  query checkout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ...checkout
      }
    }
  }
`

const CHECKOUT_LINE_ITEMS_REPLACE_MUTATION = gql`
  ${CHECKOUT_FRAGMENT}
  mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...checkout
      }
    }
  }
`

