import { QueryClient, dehydrate } from '@tanstack/vue-query';

export async function onBeforeRender(pageContext) {
  const queryClient = new QueryClient();

  // Prefetch data for the 'posts' query (adjust queryKey/queryFn as needed)
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.data.slice(0, 10);
    },
  });

  return {
    pageContext: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
