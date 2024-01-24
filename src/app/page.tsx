"use client";
import { FaGithub } from "react-icons/fa";
import SearchBar from "@/components/SearchBar";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import dateFormat, { masks } from "dateformat";
import { useState } from "react";

type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string | null;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: string;
  documentation_url:string;
  message:string;
};

export default function Home() {
  const [userName, setUserName] = useState("Dadasogithub");

  const { isPending, error, data, refetch } = useQuery<GitHubUser>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return  (
     <div className="flex w-full h-screen items-center justify-center">
          <p className="animate-bounce">Loading.....</p>
     </div>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }
 
  return (
    <div className="flex min-h-screen w-full b-stone-100  p-1.5 sm:p-4 pt-5 sm:pt-12 transition-all">
      <div className="border mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2">
        {/*  */}
        <section className="flex justify-between gap-1">
          <p className="text-xl font-semibold mt-2.5 ml-2.5 ">GitFinder</p>
          <FaGithub className="text-2xl mr-5 mt-2.5"/>
        </section>
        {/* Search box */}
        <section className="flex flex-col gap-5">
          <SearchBar
            onChange={(e) => setUserName(e.target.value)}
            onSubmit={handleSubmit}
            value={userName}
          />
          {data?.message ? (
            <div className=" flex  w-full  flex-col gap-5 rounded-lg  bg-white px-4 py-8 text-center text-red-400 ">
              User Not Found
            </div>
          ) : (
          <main className="flex w-full flex-col gap-5 rounded-lg bg-white bg-inherited px-4 py-8 min-h-[200px] ">
            <section className="flex flex-row">
              <Image
                width={200}
                height={200}
                className="h-25 w-20 rounded-full"
                src={data?.avatar_url}
                alt="img"
              />

              {/*image*/}
              <section className="flex flex-col ml-5 justify-between gap-1 transition-all sm:w-full sm:flex-row">
                <div>
                  <h1>{data?.name}</h1>
                  <a
                    target="_black"
                    href={`https://github.com/${data?.login}`}
                    className="text-blue-500 hover:underline text-sm transition-all"
                  >
                    @{data?.login}
                  </a>
                </div>
                <p className="">
                  <span>Joined </span>
                  <span>{dateFormat(data?.created_at, "dd mmm yyyy")} </span>
                </p>
              </section>
            </section>
            <section className="flex flex-col gap-3">
              <p>
                {data?.bio ?? (
                  <span className="opacity-60">This profile has no bio</span>
                )}
              </p>
              {/*    repo and follower*/}
              <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4  min-[50px]">
                {/** item1 */}
                <div className="flex flex-col items-center gap-2 ">
                  <p className="text-xs opacity-60">Repos</p>
                  <p className=" text-sm font-bold sm:text-base">
                    {data?.public_repos}
                  </p>
                </div>

                {/** item-2 */}
                <div className="flex flex-col items-center gap-2 ">
                  <p className="text-xs opacity-60">Follwers</p>
                  <p className=" text-sm font-bold sm:text-base">
                    {data?.followers}
                  </p>
                </div>

                {/** item-3 */}
                <div className="flex flex-col items-center gap-2 ">
                  <p className="text-xs opacity-60">Following</p>
                  <p className=" text-sm font-bold sm:text-base">
                    {data?.following}
                  </p>
                </div>
              </div>

              {/** Address and other link */}
              <div className="grid pt-5 grid-cols-1 gap-4 sm:grid-cols-2">
                {/** item-1 */}
                <div className="flex item-center gap-2">
                  <MdOutlineLocationOn className="text-xl" />
                  <p>
                    {data?.location ?? (
                      <span className="opacity-60">Not Available</span>
                    )}
                  </p>
                </div>
                {/** item-2 */}
                <div className="flex item-center gap-2">
                  <FaLink className="text-xl" />
                  {data?.blog ? (
                    <a
                      title={data?.blog}
                      className="hover:underline opacity-60 max-w-[220px] overflow-hidden text-ellipsis"
                      href={data?.blog ?? "#"}
                    >
                      {data?.blog}{" "}
                    </a>
                  ) : (
                    <span className="opacity-60">Not Available</span>
                  )}{" "}
                </div>
                {/** item-3 */}
                <div className="flex item-center gap-2">
                  <FaTwitter className="text-xl" />
                  <p>
                    {data?.twitter_username ?? (
                      <span className="opacity-60">Not Available</span>
                    )}
                  </p>
                </div>
                {/** item-4 */}
                <div className="flex item-center gap-2">
                  <MdOutlineHomeWork className="text-xl" />
                  <p>
                    {data?.company ?? (
                      <span className="opacity-60">Not Available</span>
                    )}
                  </p>
                </div>
              </div>
            </section>
          </main>
          )}
        </section>
      </div>
    </div>
  );
}
