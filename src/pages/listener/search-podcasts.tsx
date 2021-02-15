import React from "react";
import {Podcast} from "../host/podcast";
import {IPodcast} from "./my-subscriptions";


export const SearchPodcasts = (props: any) => {
    let podcasts = props.data?.getAllPodcasts.podcasts;
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
                <span>플레이리스트 검색</span>
            </div>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {podcastFilter?.map((podcast: any) => (
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
    )
}