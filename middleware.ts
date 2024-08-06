import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define matchers for public routes
const isPublicRoute = createRouteMatcher([
  '/', // Homepage
  '/events/:id', // Public event details
  '/sign-in', // Sign-in page
  '/sign-up', // Sign-up page
  '/api/webhook/clerk', // Public webhook endpoint
  '/api/webhook/stripe', // Public Stripe webhook endpoint
  '/api/uploadthing' // Public upload endpoint
]);

// Define matchers for ignored routes
const isIgnoredRoute = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

export default clerkMiddleware((auth, req) => {
  // Allow access to public routes without authentication
  if (isPublicRoute(req)) {
    return;
  }

  // Allow access to ignored routes without authentication
  if (isIgnoredRoute(req)) {
    return;
  }

  // Redirect to sign-in page if not authenticated and the route is protected
  if (!auth().userId) {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
