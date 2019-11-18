import { RouteConfig } from "vue-router";

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92YWxpZGF0ZSIsImlhdCI6MTU2OTc0NzE3MCwiZXhwIjoxNTcwMTM2OTgwLCJuYmYiOjE1NzAxMzMzODAsImp0aSI6IkdabU8zNmZzUlVPNHNBaEMiLCJzdWIiOjJ9.vIU9QFk5ZKR3VyiMkj_7byNAwZKrXDdVfX72ShEzXKQ
export function enhanceRoutes(
  routes: Array<RouteConfig>,
  options = {},
  shouldProcess?: (route: RouteConfig) => boolean
): Array<RouteConfig> {
  return routes.map(route => {
    if (typeof shouldProcess === 'function' && !shouldProcess(route)) {
      return route;
    }
    let children: Array<RouteConfig> | undefined;
    if (Array.isArray(route.children) && route.children.length > 0) {
      children = enhanceRoutes(route.children, options);
    }
    return { ...route, ...options, children };
  });
}
