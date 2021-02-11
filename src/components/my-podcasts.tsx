import React from "react";
import { Podcast } from "./podcast";

export const MyPodcasts = (props: any) => {
  return (
    <div className="w-full mb-32 pt-20 px-10">
      <div className="text-white font-bold text-2xl pb-5">
        <span>내 라이브러리</span>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {props.data?.myPodcasts.podcasts?.map((podcast: any) => (
          <Podcast
            key={podcast.id}
            id={podcast.id + ""}
            category={podcast.category}
            title={podcast.title}
            description={podcast.description}
          />
        ))}
      </div>
    </div>
  );
};
