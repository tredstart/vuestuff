import type { OnBeforeRenderAsync, PageContext } from "vike/types";

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  const { id } = pageContext.routeParams;
  return {
    pageContext: {
      routeParams: { id },
    } as Partial<PageContext>,
  };
};
