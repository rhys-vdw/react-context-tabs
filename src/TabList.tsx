import classNames from "classnames";
import React, { HTMLAttributes } from "react";

export type Props = Readonly<HTMLAttributes<HTMLUListElement>>;

export function TabList(props: Props) {
  const { children, className, ...rest } = props;
  return (
    <ul className={classNames("TabList", className)} {...rest}>
      {children}
    </ul>
  );
}
