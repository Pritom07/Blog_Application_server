import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "ROUTE_NOT_FOUND",
    path: req.originalUrl,
    date: Date(),
  });
};

export default notFound;
