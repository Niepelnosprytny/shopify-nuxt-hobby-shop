import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const route = useRoute();
  const { data: product } = await useAsyncData(
      `product-${route.params.handle}`,
      () => GqlProduct({ handle: route.params.handle as string })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
}
