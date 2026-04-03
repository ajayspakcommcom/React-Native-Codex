import {useEffect, useState} from 'react';

import {serviceHealthService} from '../services/serviceHealthService';
import type {ServiceHealthItem} from '../types';

export const useServiceHealth = () => {
  const [items, setItems] = useState<ServiceHealthItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      const nextItems = await serviceHealthService.list();

      if (isMounted) {
        setItems(nextItems);
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

  return {items, isLoading};
};
