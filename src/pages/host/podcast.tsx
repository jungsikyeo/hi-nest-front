import React from "react";
import { Link } from "react-router-dom";
import podcastDefault from "../../images/podcast_default.svg";

interface IPodcastProps {
  id: string;
  title: string;
  category: string;
  description?: string;
}

export const Podcast: React.FC<IPodcastProps> = ({
  id,
  title,
  category,
}) => (
  <Link to={`/podcasts/${id}`}>
    <div className="flex flex-col bg-gray-900 w-full">
      <div className="pt-5 flex items-center justify-center">
        <img
          src={podcastDefault}
          className="w-10/12 bg-gray-700"
          alt="podcast default"
        />
      </div>
      <span className="p-3 h-10 text-sm opacity-70 border-gray-800 overflow-hidden overflow-ellipsis">
        {category}
      </span>
      <div className="text-lg font-bold text-white px-3 pt-1 overflow-hidden overflow-ellipsis whitespace-nowrap w-auto h-14">
        {title}
      </div>
    </div>
  </Link>
);
