import Layout from "@/components/Navbar/layout";

import Button from "@/components/Button";
import Grid from "@/components/Grid";

import { AiOutlinePlus } from "react-icons/ai";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const { status } = useSession();
  if (status === "loading") {
    return (
      <div className="absolute inset-0 flex animate-pulse items-center justify-center space-x-2 bg-white">
        <div className="h-8 w-8 rounded-full bg-blue-400"></div>
        <div className="h-8 w-8 rounded-full bg-blue-400"></div>
        <div className="h-8 w-8 rounded-full bg-blue-400"></div>
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className="pt-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold md:text-4xl">Events</h1>
        <Link href={"/add"}>
          <Button variant={"solid"} classNames={"hidden md:block"}>
            Create new event
          </Button>
        </Link>
        <Button variant={"solid"} classNames={"block px-2 py-2 md:hidden"}>
          <AiOutlinePlus className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-12">
        <div>
          <label
            htmlFor="hs-trailing-button-add-on-with-icon"
            className="sr-only"
          >
            Label
          </label>
          <div className="flex rounded-lg shadow-sm">
            <input
              type="text"
              id="hs-trailing-button-add-on-with-icon"
              name="hs-trailing-button-add-on-with-icon"
              placeholder="Search events"
              className="block w-full rounded-s-lg border-gray-200 px-4 py-3 text-sm shadow-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
            />
            <button
              type="button"
              className="inline-flex h-[2.875rem] w-[2.875rem] flex-shrink-0 items-center justify-center gap-x-2 rounded-e-md border border-transparent bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <svg
                className="h-4 w-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Grid />
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};