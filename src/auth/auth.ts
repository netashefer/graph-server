import { auth } from 'express-oauth2-jwt-bearer';

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const verifyJwt = auth({
  audience: 'https://localhost:8000',
  issuerBaseURL: `https://graphit.us.auth0.com/`,
});
