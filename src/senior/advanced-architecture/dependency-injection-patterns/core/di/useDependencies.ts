import {useOptionalDependencies} from './DependencyProvider';

export const useDependencies = () => {
  const dependencies = useOptionalDependencies();

  if (dependencies === null) {
    throw new Error('useDependencies must be used within DependencyProvider');
  }

  return dependencies;
};
