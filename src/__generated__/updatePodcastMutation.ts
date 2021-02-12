/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updatePodcastMutation
// ====================================================

export interface updatePodcastMutation_updatePodcast {
  __typename: "CoreOutput";
  error: string | null;
  ok: boolean;
}

export interface updatePodcastMutation {
  updatePodcast: updatePodcastMutation_updatePodcast;
}

export interface updatePodcastMutationVariables {
  updatePodcastInput: UpdatePodcastInput;
}
