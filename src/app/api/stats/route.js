import { connectDB } from "@/lib/mongodb";
import Url from "@/models/Url";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const totalUrls =
      await Url.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const urls = await Url.find();

    const totalClicks = urls.reduce(
      (sum, url) => sum + url.clicks,
      0
    );

    return Response.json({
      success: true,
      totalUrls,
      totalUsers,
      totalClicks,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}