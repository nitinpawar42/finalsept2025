
import { defineMiddleware } from 'astro:middleware';

// This is a basic, do-nothing middleware.
// It's used to test if the middleware file itself can be loaded.
export const onRequest = defineMiddleware((context, next) => {
  return next();
});
