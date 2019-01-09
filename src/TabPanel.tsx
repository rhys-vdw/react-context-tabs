import classNames from "classnames";
import React, { ReactNode } from "react";
import { Consumer } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  className?: string;
  tabId: TabId;
  children: ReactNode;
}

export function TabPanel(props: Props) {
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
}
