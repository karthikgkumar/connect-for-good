import { useSession } from "next-auth/react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Layout from "@/components/Navbar/layout";
import TextArea from "@/components/TextArea";

import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      console.log("fetching");
      setLoading(true);
      const res = await fetch("/api/user/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: session.user.role,
          email: session.user.email,
        }),
      });
      if (ignore) return;
      const data = await res.json();
      setUserData(data.data);
      setLoading(false);
    };
    if (session) {
      fetchUser();
    }
    return () => {
      ignore = true;
    };
  }, [session]);

  async function handleUpdate() {
    setLoading(true);
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: session.user.role,
        email: session.user.email,
        data: userData,
      }),
    });
    setLoading(false);
    setUpdate(false);
  }

  function handleEdit() {
    setUpdate(true);
  }

  if (status === "loading") return null;
  else if (status === "unauthenticated") router.push("/");
  else if (status === "authenticated" && userData) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="my-8 flex h-[800px] rounded-lg shadow-lg">
            <div className="relative flex flex-col items-center gap-6 bg-slate-100 px-12 pt-12">
              {session ? (
                <img
                  width={40}
                  height={40}
                  className="h-40 w-40 rounded-full"
                  src={session.user.image}
                  alt="profile picture"
                />
              ) : null}
              <Button clickHandle={handleEdit} variant={"solid"}>
                Edit profile
                <CiEdit />
              </Button>
              <div className="mt-4 flex gap-12">
                <div>
                  <h1 className="text-xl font-semibold">Last event:</h1>
                  <p className="mt-1 text-base">Seven months ago</p>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Location:</h1>
                  <p className="mt-1 text-base">Kochi</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center gap-1">
                <p className="flex items-center gap-1 text-lg">
                  <SlCalender />
                  Joined 4th September 2023
                </p>
                <p className="flex items-center gap-1 text-lg">
                  <FaCheck />
                  35 event completed
                </p>
              </div>
            </div>
            <div className="h-[800px] flex-grow overflow-y-scroll px-12 py-16">
              <h1 className="text-2xl font-semibold md:text-4xl">
                {session.user.role === "organization"
                  ? "Organization details"
                  : "Volunteer details"}
              </h1>
              <form className="mt-4 flex flex-col gap-6">
                {session.user.role === "organization" ? (
                  <>
                    <Input
                      name={"Name"}
                      value={userData.name}
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                    <Input
                      name={"Email"}
                      value={userData.email}
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                    <Input
                      name={"Address"}
                      value={
                        userData.address !== null
                          ? userData.address
                          : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                    />
                    <Input
                      name={"Goals"}
                      value={
                        userData.goals !== null ? userData.goals : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, goals: e.target.value })
                      }
                    />
                    <TextArea
                      name={"Description"}
                      value={
                        userData.description !== null
                          ? userData.description
                          : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({
                          ...userData,
                          description: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <Input
                      name={"Name"}
                      value={userData.name}
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                    <Input
                      name={"Email"}
                      value={userData.email}
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                    <Input
                      name={"Experience"}
                      value={
                        userData.experience !== null
                          ? userData.experience
                          : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, experience: e.target.value })
                      }
                    />
                    <Input
                      name={"Education"}
                      value={
                        userData.education !== null
                          ? userData.education
                          : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, education: e.target.value })
                      }
                    />
                    <Input
                      name={"Occupation"}
                      value={
                        userData.occupation !== null
                          ? userData.occupation
                          : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, occupation: e.target.value })
                      }
                    />
                    <TextArea
                      name={"About"}
                      value={
                        userData.about !== null ? userData.about : "(Not given)"
                      }
                      readonly={!update}
                      onchange={(e) =>
                        setUserData({ ...userData, about: e.target.value })
                      }
                    />
                  </>
                )}

                {update ? (
                  <Button
                    variant={"solid"}
                    classNames={"mt-4"}
                    clickHandle={handleUpdate}
                  >
                    Submit
                  </Button>
                ) : null}
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
