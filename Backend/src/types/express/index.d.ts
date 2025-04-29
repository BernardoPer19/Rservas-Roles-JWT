// src/types/express/index.d.ts

import { UserTypes } from "../AuthTypes";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserTypes;
    }
  }
}
