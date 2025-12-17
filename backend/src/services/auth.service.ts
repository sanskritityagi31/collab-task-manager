import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";

const JWT_SECRET = process.env.JWT_SECRET!;

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({
      name,
      email,
      password: hashed,
    });

    return user;
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  },
};
