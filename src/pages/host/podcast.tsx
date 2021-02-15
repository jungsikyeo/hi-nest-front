import React from "react";
import { Link } from "react-router-dom";
import podcastDefault from "../../images/podcast_default.svg";
import {Thumbnail} from "../../components/thumbnail";

interface IPodcastProps {
  id: string;
  title: string;
  category: string;
  description?: string;
}

export const Podcast = (props: any) => {
  const podcast = props.data.podcast;
  return (
    <Link to={`/podcasts/${podcast.id}`}>
      <div className="flex flex-col bg-gray-900 w-full">
        <div className="pt-5 flex items-center justify-center">
          <Thumbnail data={podcast} />
        </div>
        <span className="p-3 h-10 text-sm opacity-70 border-gray-800 overflow-hidden overflow-ellipsis">
          {podcast.category}
        </span>
        <div className="text-lg font-bold text-white px-3 pt-1 overflow-hidden overflow-ellipsis whitespace-nowrap w-auto h-14">
          {podcast.title}
        </div>
      </div>
    </Link>
  );
};
