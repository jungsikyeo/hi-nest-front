import React from "react";
import { Podcast } from "../host/podcast";

export interface IPodcast {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const MySubscriptions = (props: any) => {
  let podcasts = props.data?.subscriptions;
  let searchText = props.text?.target?.value;
  let podcastFilter: [IPodcast] = searchText
    ? podcasts.filter(
        (row: IPodcast) =>
          row.title.toLocaleLowerCase().indexOf(searchText?.toLowerCase()) >
            -1 ||
          row.category.toLocaleLowerCase().indexOf(searchText?.toLowerCase()) >
            -1
      )
    : podcasts;
  return (
    <div className="w-full py-5 px-10">
      <div className="text-white font-bold text-2xl pb-5">
        <span>내 구독 플레이리스트</span>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {podcastFilter?.map((podcast: any, index:number) => (
          <Podcast key={podcast.id} data={{podcast, index}} />
        ))}
      </div>
    </div>
  );
};
