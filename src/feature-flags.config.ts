import { FlagType } from 'feature-flags/react';
/* ****************** FEATURE FLAG CODES **************** */
/*
Add all feature flag ids as constants so it can be used across the application.
For example:

export const COLORS = 'COLORS';
*/

/* ****************** FEATURE FLAG  ARRAY ************** */
/*
Add all feature flags in the following format:
[
  {
    id: COLORS,  // id used across the app for this feature
    active: false, // should the feature be enabled?
    description: 'A list of all the primary and secondary colors.', // description shown for this feature
  },
  ...
]
*/

export const featureFlagArray: [FlagType] | [] = [];
