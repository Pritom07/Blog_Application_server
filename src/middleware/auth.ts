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
        emailVarified: boolean;
        status: string;
      };
    }
  }
}

export enum userRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

const auth = (...role: userRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
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
          message: "Forbidden! Please verify your email.",
        });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as string,
        emailVarified: session.user.emailVerified,
        status: session.user.status as string,
      };

      if (role.length && role.includes(req.user.role as userRole)) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: "You are not allowed to perform this action",
      });
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
