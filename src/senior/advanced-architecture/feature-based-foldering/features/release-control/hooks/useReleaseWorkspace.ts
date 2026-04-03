import {useEffect, useState} from 'react';

import {releaseService} from '../services/releaseService';
import type {ReleaseWorkspace} from '../types';

export const useReleaseWorkspace = () => {
  const [workspace, setWorkspace] = useState<ReleaseWorkspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      const nextWorkspace = await releaseService.loadWorkspace();

      if (isMounted) {
        setWorkspace(nextWorkspace);
        setIsLoading(false);
      }
    };

    run().catch(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return {workspace, isLoading};
};
