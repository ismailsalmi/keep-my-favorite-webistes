import type { ReactNode } from "react";

export type StateAction<T extends any> = (
  value: ((prevState: T) => T) | T
) => void;
export interface PropsComponent<P = {}> {
  (props: P): ReactNode;
  deprecatedLegacyContext?: any;
}

export type TData = {
  id: string;
  title: string;
  created_at: Date;
  url: string;
  email: string;
};
