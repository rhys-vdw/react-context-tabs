import React, { StatelessComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Consumer, Context } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  className?: string;
  tabId: TabId;
}

export const TabPanel: StatelessComponent<Props> = (props) => {
  const { children, className, tabId } = props;
  return (
    <Consumer>
      {({ selectedTabId }) => tabId !== selectedTabId ? null : (
        <section className={classNames("TabPanel", className)}>
          {children}
        </section>
      )}
    </Consumer>
  );
};

TabPanel.propTypes = {
  className: PropTypes.string,
  tabId: PropTypes.any.isRequired
} as any;
