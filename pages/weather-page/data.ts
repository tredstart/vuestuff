// composables/usePostsQuery.js
import { useQuery } from '@tanstack/vue-query';

export function usePostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    },
    select: (data) => data.slice(0, 10), // Optional: Transform data (e.g., limit to 10 posts)
  });
}
