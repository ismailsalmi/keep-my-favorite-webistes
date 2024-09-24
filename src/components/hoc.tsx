import { type ComponentType, memo, type MemoExoticComponent } from "react";

const HOC = <P extends object>(
  Component: ComponentType<P>
): MemoExoticComponent<ComponentType<P>> => {
  return memo(Component);
};
export default HOC;
