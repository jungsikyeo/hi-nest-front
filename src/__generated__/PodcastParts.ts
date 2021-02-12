/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  episodes: PodcastParts_episodes[];
}
