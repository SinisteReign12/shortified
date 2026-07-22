import { connectDB } from "@/lib/mongodb";
import Url from "@/models/Url";
import Analytics from "@/models/Analytics";
import ClicksChart from "@/components/ClicksChart";
import QRCodeCard from "@/components/QRCodeCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import DeleteButton from "@/components/DeleteButton";
import EditAliasButton from "@/components/EditAliasButton";
import SearchUrls from "@/components/SearchUrls";
import SkeletonCard from "@/components/SkeletonCard";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await connectDB();

  const urls = await Url.find({
    userId: session.user.id,
  });

  const analytics = await Analytics.find();

  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (sum, url) => sum + url.clicks,
    0
  );

  const activeUrls = urls.filter(
    (url) =>
      !url.expiresAt ||
      new Date() <= new Date(url.expiresAt)
  ).length;

  const expiredUrls = urls.filter(
    (url) =>
      url.expiresAt &&
      new Date() > new Date(url.expiresAt)
  ).length;

  const topUrl = urls.sort(
    (a, b) => b.clicks - a.clicks
  )[0];

  const chartData = urls.map((url) => ({
    shortCode: url.shortCode,
    clicks: url.clicks,
  }));

  const serializedUrls = JSON.parse(
    JSON.stringify(urls)
  );

  return (
    <div className="p-4 md:p-10">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6  shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Total URLs
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalUrls}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6  shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Total Clicks
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalClicks}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6  shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Active URLs
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-500">
            {activeUrls}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6  shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Expired URLs
          </h2>

          <p className="text-3xl font-bold mt-2 text-red-500">
            {expiredUrls}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6  shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-lg font-semibold">
            Analytics Records
          </h2>

          <p className="text-3xl font-bold mt-2">
            {analytics.length}
          </p>
        </div>

      </div>

      <ClicksChart data={chartData} />

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8 shadow">
        <h2 className="text-xl font-bold mb-2">
          Most Popular URL
        </h2>

        {topUrl ? (
          <>
            <p>{topUrl.originalUrl}</p>

            <p className="font-semibold">
              Clicks: {topUrl.clicks}
            </p>

            <p>
              Short Code: {topUrl.shortCode}
            </p>
          </>
        ) : (
          <p>No URLs Found</p>
        )}
      </div>

      <SearchUrls
        urls={serializedUrls}
      />
      
    </div>
  );
}