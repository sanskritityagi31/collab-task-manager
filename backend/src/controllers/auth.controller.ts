import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";
import { UserRepository } from "../repositories/user.repository";

export const AuthController = {
  async register(req: Request, res: Response) {
    const data = RegisterDto.parse(req.body);

    const user = await AuthService.register(
      data.name,
      data.email,
      data.password
    );

    res.status(201).json({ user });
  },

  async login(req: Request, res: Response) {
    const data = LoginDto.parse(req.body);

    const { user, token } = await AuthService.login(
      data.email,
      data.password
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({ user });
  },

  async me(req: any, res: Response) {
    const user = await UserRepository.findById(req.userId);
    res.json(user);
  },
};
