import { NextApiRequest, NextApiResponse } from "next";

export default function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  // Implemente a lógica de autenticação aqui
  const userIsAuthenticated = true; // exemplo de autenticação
  if (userIsAuthenticated) {
    console.log("ENTRO PORRA");
    next();
  } else {
    res.send("nao deu");
  }
}
