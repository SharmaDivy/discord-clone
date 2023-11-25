import { TokenizedUserDetails } from "./auth.ts";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: TokenizedUserDetails;
    }
  }
}
