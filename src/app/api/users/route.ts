import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../authMiddleware";

// Rota GET de usuários
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  authMiddleware(req, res, () => {
    res.send("te amo");
  });
}
