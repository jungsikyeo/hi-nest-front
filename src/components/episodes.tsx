import React from "react";
import podcastDefault from "../images/podcast_default.svg";

export const Episodes = (props: any) => {
  const episode = props.data.episode;
  const index = props.data.index + 1;
  return (
    <section
      key={episode?.id}
      className={`
                  grid gap-4 grid-cols-4 
                  h-15 
                  text-sm 
                  hover:border hover:border-gray-500 hover:border-opacity-90 
                  hover:bg-gray-500 hover:bg-opacity-20 rounded-md pl-5 py-2 ${
                    index === 0 ? `mt-5` : ``
                  }`}
      style={{
        gridTemplateColumns:
          "[index] 16px [first] 6fr [var1] 4fr [last] minmax(120px,1fr)",
      }}
    >
      <span className="flex items-center">{index}</span>
      <div className="flex items-center">
        {episode?.imageUrl ? (
          <img src={episode?.imageUrl} className="w-10 h-10" alt="thumnail" />
        ) : (
          <img
            src={podcastDefault}
            className="w-10 h-10 bg-gray-700"
            alt="thumnail"
          />
        )}
        <span className="text-white pl-3">{episode?.title}</span>
      </div>
      <span className="flex items-center">{episode?.category}</span>
      <span className="flex items-center">{`${
        episode?.playTime
          ? `${Math.floor(episode?.playTime / 60000)}:${(
              episode?.playTime % 60000
            )
              .toString()
              .substring(0, 2)}`
          : ``
      }`}</span>
    </section>
  );
};
