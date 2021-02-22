/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubscriptionsQuery
// ====================================================

export interface SubscriptionsQuery_subscriptions_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  playTime: number | null;
}

export interface SubscriptionsQuery_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  episodes: SubscriptionsQuery_subscriptions_episodes[];
}

export interface SubscriptionsQuery {
  subscriptions: SubscriptionsQuery_subscriptions[];
}
