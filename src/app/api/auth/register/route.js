import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } =
      await req.json();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return Response.json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return Response.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({
      success: true,
      user,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}