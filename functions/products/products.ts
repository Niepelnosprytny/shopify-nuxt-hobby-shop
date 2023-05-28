import { Handler } from '@netlify/functions';

const fetch = require('node-fetch');

export const handler: Handler = async (event) => {
  const query = `
    query Products ($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            title
            description
            handle
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
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
    body: JSON.stringify(data),
  }
}
