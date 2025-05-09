import type { OnBeforeRenderAsync, PageContext } from "vike/types";

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  const { name } = pageContext.routeParams;
  return {
    pageContext: {
      routeParams: { name },
    } as Partial<PageContext>,
  };
};
