import { Handler } from '@netlify/functions';
const fetch = require('node-fetch');

export const handler: Handler = async (event, context) => {
  const query = `
      query Product ($handle: String!) {
        productByHandle(handle: $handle) {
            id
            availableForSale
            title
            productType
            priceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
            }
            description
            images(first: 8) {
                edges {
                    node {
                        src
                    }
                }
            }
            variants (first: 1) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
  `;

  // @ts-ignore
  const variables = JSON.parse(event.headers.variables);

  // @ts-ignore
  const data = await fetch(process.env.SHOPIFY_DOMAIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables }),
  }).then((res: { json: () => any; }) => res.json());

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
