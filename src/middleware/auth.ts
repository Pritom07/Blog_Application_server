import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }
  }
}

export enum userRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

const auth = (...userRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!session.user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    req.user = {
      id: session.session.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role as string,
    };

    if (userRole.length && userRole.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "You are not allowed to perform this action",
    });
  };
};

export default auth;
