import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../dtos/auth.dto";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await registerUser(data);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user, token } = await loginUser(data.email, data.password);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // localhost
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

/**
 * GET CURRENT LOGGED-IN USER
 * GET /api/auth/me
 */
export const me = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};
