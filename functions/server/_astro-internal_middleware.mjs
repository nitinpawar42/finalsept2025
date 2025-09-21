import { d as defineMiddleware, s as sequence } from './chunks/index_DqtlGuyM.mjs';
import { getAuth } from 'firebase-admin/auth';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_xwwv52z8.mjs';
import 'kleur/colors';
import './chunks/astro/server_BeWHlNiw.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const auth = getAuth();
  const sessionCookie = context.cookies.get("session")?.value;
  if (!sessionCookie && (context.url.pathname.startsWith("/admin") || context.url.pathname.startsWith("/reseller"))) {
    return context.redirect("/login");
  }
  if (sessionCookie) {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
      const { role } = decodedClaims;
      if (context.url.pathname.startsWith("/admin") && role !== "admin") {
        return context.redirect("/login");
      }
      if (context.url.pathname.startsWith("/reseller") && role !== "reseller") {
        return context.redirect("/login");
      }
    } catch (error) {
      return context.redirect("/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
