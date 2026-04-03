import React, {createContext, useContext, useMemo} from 'react';

import type {SeniorDependencies} from '../../contracts/dependencyContracts';

const DependencyContext = createContext<SeniorDependencies | null>(null);

type Props = {
  dependencies: SeniorDependencies;
  overrides?: Partial<SeniorDependencies>;
  children: React.ReactNode;
};

export const DependencyProvider = ({
  dependencies,
  overrides,
  children,
}: Props) => {
  const value = useMemo(
    () => ({
      ...dependencies,
      ...overrides,
    }),
    [dependencies, overrides],
  );

  return (
    <DependencyContext.Provider value={value}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useOptionalDependencies = () => useContext(DependencyContext);
