import React, { StatelessComponent, HTMLAttributes } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

type Props = HTMLAttributes<HTMLUListElement>;

export const TabList: StatelessComponent<Props> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <ul className={classNames("TabList", className)} {...rest}>
      {children}
    </ul>
  );
};

TabList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
} as any;
