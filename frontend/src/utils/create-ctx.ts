import React, { createContext, useContext as useReactContext } from 'react';

export interface CreateCtxOptions<T> {
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
}

export type CreateCtxReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

const getErrorMessage = (hook: string, provider: string) => {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
};

export const createCtx = <T>(
  options: CreateCtxOptions<T> = {},
): CreateCtxReturn<T> => {
  const {
    strict = true,
    hookName = 'useCtx',
    providerName = 'CtxProvider',
    errorMessage = getErrorMessage(hookName, providerName),
    name = 'Ctx',
    defaultValue,
  } = options;

  const Context = createContext<T | undefined>(defaultValue);

  Context.displayName = name;

  const useContext = () => {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateCtxReturn<T>;
};
