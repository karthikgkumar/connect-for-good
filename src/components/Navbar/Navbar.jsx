import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (status === "unauthenticated") router.push("/");

  return (
    <header className="sticky top-0 z-50 flex w-full flex-wrap border-b border-gray-300 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-4">
      <nav
        className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold text-blue-600 "
            href={"/dashboard"}
            aria-label="Brand"
          >
            Connect for Good
          </Link>
          <div className="sm:hidden">
            <Link href={"/profile"}>
              {session ? (
                <Image
                  width={40}
                  height={40}
                  className="mr-2 inline-block h-[2rem] w-[2rem] cursor-pointer rounded-full"
                  src={session.user.image}
                  alt="Image Description"
                />
              ) : null}
            </Link>
            <button
              type="button"
              className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="h-4 w-4 hs-collapse-open:hidden"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hidden h-4 w-4 hs-collapse-open:block"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
        >
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:pl-7">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Notifications
              <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                5
              </span>
            </button>

            <Link href={"/profile"}>
              {session ? (
                <Image
                  width={40}
                  height={40}
                  className="hidden h-[2.375rem] w-[2.375rem] cursor-pointer rounded-full md:inline-block"
                  src={session.user.image}
                  alt="Image Description"
                />
              ) : null}
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-x-2 font-medium text-black hover:text-blue-600 dark:border-gray-700 dark:text-gray-500 dark:hover:text-blue-500 sm:my-6 sm:border-l sm:border-gray-500 sm:pl-6"
              href="#"
            >
              <BiLogOut />
              Log out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
