import { Fragment, PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}