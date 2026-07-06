import { connectDB } from "@/lib/mongodb";
import Url from "@/models/Url";
import Analytics from "@/models/Analytics";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  await connectDB();

  const { shortCode } = await params;

  const url = await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!url) {
    return <h1>URL Not Found</h1>;
  }

  if (
    url.expiresAt &&
    new Date() > new Date(url.expiresAt)
  ) {
    return (
      <h1 className="p-10 text-3xl">
        Link Expired
      </h1>
    );
  }

  const headerList = await headers();

  await Analytics.create({
    shortCode,
    browser: headerList.get("user-agent"),
  });

  redirect(url.originalUrl);
}