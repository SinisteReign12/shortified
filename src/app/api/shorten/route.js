import { connectDB } from "@/lib/mongodb";
import Url from "@/models/Url";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";



export async function POST(req) {
  try {
    await connectDB();

    const session =
      await getServerSession(authOptions);

    if (!session) {
      return Response.json({
        success: false,
        message: "Please login to create short URLs",
      });
    }

    const body = await req.json();

    if (!body.originalUrl?.trim()) {
      return Response.json({
        success: false,
        message: "Please enter a URL",
      });
    }

    try {
      new URL(body.originalUrl);
    } catch {
      return Response.json({
        success: false,
        message: "Please enter a valid URL",
      });
    }

    const existingUrl = await Url.findOne({
      originalUrl: body.originalUrl,
      userId: session.user.id,
    });

    if (!body.originalUrl?.trim()) {
      return Response.json({
        success: false,
        message: "Please enter a URL",
      });
    }

    try {
      new URL(body.originalUrl);
    } catch {
      return Response.json({
        success: false,
        message: "Please enter a valid URL",
      });
    }

    if (existingUrl) {

      return Response.json({
        success: true,
        alreadyExists: true,
        message: "You've already shortened this URL",
        shortUrl: existingUrl.shortCode,
      });

    }

    const shortCode =
      body.customAlias || nanoid(6);

    if (body.customAlias) {
      const existing = await Url.findOne({
        shortCode: body.customAlias,
      });

      if (existing) {
        return Response.json({
          success: false,
          message: "Alias already exists",
        });
      }
    }

    let expiresAt = null;

    if (body.expiresInDays) {
      expiresAt = new Date();

      expiresAt.setDate(
        expiresAt.getDate() +
        Number(body.expiresInDays)
      );
    }

    const url = await Url.create({
      originalUrl: body.originalUrl,
      shortCode,
      userId: session.user.id,
      expiresAt,
    });

    return Response.json({
      success: true,
      shortUrl: shortCode,
      data: url,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}