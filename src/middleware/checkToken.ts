import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const protect = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        name: string;
        email: string;
        password: string;
      };
      const user = await prisma.user.findUnique({
        where: {
          //   id: decoded.id,
          id: decoded.id,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
