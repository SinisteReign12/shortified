import { connectDB } from "@/lib/mongodb";
import Url from "@/models/Url";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(
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

    const { shortCode } =
      await req.json();

    const existing =
      await Url.findOne({
        shortCode,
      });

    if (
      existing &&
      existing._id.toString() !== id
    ) {
      return Response.json({
        success: false,
        message:
          "Alias already exists",
      });
    }

    const updatedUrl =
      await Url.findByIdAndUpdate(
        id,
        {
          shortCode,
        },
        {
          new: true,
        }
      );

    return Response.json({
      success: true,
      url: updatedUrl,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}