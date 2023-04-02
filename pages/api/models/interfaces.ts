import { NextApiRequest } from "next";

export interface ExtendedNextApiRequest extends NextApiRequest {
  userId?: string;
}
