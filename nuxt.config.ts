// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
// @ts-ignore
export default defineNuxtConfig({
    target: 'static',
    ssr: false,
    modules: ['nuxt-graphql-client'],

    runtimeConfig: {
        public: {
            'graphql-client': {
                clients: {
                    default: {
                        host: process.env.SHOPIFY_DOMAIN,
                        token: {
                            name: 'X-Shopify-Storefront-Access-Token',
                            value: process.env.SHOPIFY_STOREFRONT_TOKEN,
                            type: null
                        },
                        retainToken: true
                    }
                }
            }
        }
    },
})
