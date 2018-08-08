import React, { StatelessComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Context } from "./Context";

export interface Props {
  className?: string;
  tabId: any;
}

export const TabPanel: StatelessComponent<Props> = (props, { selectedTabId }: Context) => {
  const { children, className, tabId } = props;
  return tabId !== selectedTabId ? null : (
    <section className={classNames("TabPanel", className)}>
      {children}
    </section>
  );
};

TabPanel.propTypes = {
  className: PropTypes.string,
  tabId: PropTypes.any.isRequired
} as any;

TabPanel.contextTypes = {
  selectedTabId: PropTypes.any
};
