import { connectDB } from "@/lib/mongodb";
import Url from "@/models/Url";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req,
  { params }
) {
  try {
    await connectDB();

    const session =
      await getServerSession(authOptions);

    if (!session) {
      return Response.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = await params;

    const url = await Url.findById(id);

    if (!url) {
      return Response.json({
        success: false,
        message: "URL not found",
      });
    }

    if (
      url.userId?.toString() !==
      session.user.id
    ) {
      return Response.json({
        success: false,
        message: "Forbidden",
      });
    }

    await Url.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "URL deleted",
    });
    
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}