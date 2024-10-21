import { Request, Response, NextFunction } from "express";
export function notFound(res: Response, req: Request) {
    res.status(404).json({message: 'Endpoint not found'})
}
export function handleError(err: Error, req: Request, res: Response) {
    res.status(500).json({message: 'Internal server error'})
}