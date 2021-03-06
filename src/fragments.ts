import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    category
    description
    episodes {
      id
      title
      category
      imageUrl
      playTime
      playId
    }
  }
`;
