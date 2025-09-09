import React from 'react';

const AppContext = React.createContext({} as any);
export default AppContext;

export type FeatureFlags = Record<string, boolean>;
export const FeatureFlagsContext = React.createContext<FeatureFlags>({});
