import React, { useEffect, useMemo, useState } from 'react';
import { FeatureFlagsContext, FeatureFlags } from '../AppContext.ts';
import endpoints from '../constants/endpoints.ts';

function parseQueryFlags(): Partial<FeatureFlags> {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || window.location.search);
    const flagsParam = params.get('flags');
    if (!flagsParam) return {};
    // flags=a,b,!c -> a=true,b=true,c=false
    return flagsParam.split(',').reduce((acc, key) => {
        const trimmed = key.trim();
        if (!trimmed) return acc;
        if (trimmed.startsWith('!')) acc[trimmed.slice(1)] = false;
        else acc[trimmed] = true;
        return acc;
    }, {} as FeatureFlags);
}

const LOCAL_OVERRIDE_KEY = 'featureFlagOverrides';

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [flags, setFlags] = useState<FeatureFlags>({});

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(endpoints.flags);
                const json = await res.json();
                const baseFlags: FeatureFlags = Object.fromEntries(
                    Object.entries(json?.flags || {}).map(([k, v]: any) => [k, !!v?.enabled])
                );

                const saved = JSON.parse(localStorage.getItem(LOCAL_OVERRIDE_KEY) || 'null') || {};
                const url = parseQueryFlags();
                const merged: FeatureFlags = { ...baseFlags, ...saved, ...url };
                setFlags(merged);
            } catch (e) {
                setFlags({});
            }
        })();
    }, []);

    const value = useMemo(() => flags, [flags]);

    return (
        <FeatureFlagsContext.Provider value={value}>
            {children}
        </FeatureFlagsContext.Provider>
    );
};

export function useFeatureFlag(flagKey: string): boolean {
    const ctx = React.useContext(FeatureFlagsContext);
    return !!ctx[flagKey];
}

export function setLocalFlagOverride(flagKey: string, value: boolean) {
    const saved = JSON.parse(localStorage.getItem(LOCAL_OVERRIDE_KEY) || 'null') || {};
    saved[flagKey] = value;
    localStorage.setItem(LOCAL_OVERRIDE_KEY, JSON.stringify(saved));
}


