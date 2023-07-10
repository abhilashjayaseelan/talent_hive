import { Request, Express } from "express";

export interface CustomRequest extends Request {
    payload?: string;
    role?: string;
}