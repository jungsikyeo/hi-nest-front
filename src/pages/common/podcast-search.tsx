import { gql, useQuery } from "@apollo/client";
import React from "react";
import { PODCAST_FRAGMENT } from "../../fragments";
import { PODCAST_QUERY } from "../host/host-home";
import { IPodcast } from "../host/my-podcasts";
import { Podcast } from "../host/podcast";

const GET_ALL_PODCAST = gql`
  query GetAllPodcastQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const PodcastSearch = (props: any) => {
  let { data: podcasts } = useQuery(GET_ALL_PODCAST);
  const searchText = props.text?.target?.value;
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
        <span>플레이리스트 검색</span>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {podcastFilter?.map((podcast: any, index: number) => (
          <Podcast key={podcast.id} data={{ podcast, index }} />
        ))}
      </div>
    </div>
  );
};
