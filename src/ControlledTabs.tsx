import React, { Component, ReactNode } from "react";
import { Provider } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  readonly onTabChange: (nextTabId: TabId, prevTabId: TabId) => void;
  readonly selectedTabId: TabId;
  readonly children?: ReactNode;
}

export class ControlledTabs extends Component<Props> {
  private setSelectedTabId = (tabId: TabId) => {
    const { onTabChange, selectedTabId } = this.props;
    onTabChange(tabId, selectedTabId);
  };

  render() {
    const {
      onTabChange, // unused
      selectedTabId,
      children
    } = this.props;
    const { setSelectedTabId } = this;

    return (
      <Provider value={{ selectedTabId, setSelectedTabId }}>
        {children}
      </Provider>
    );
  }
}
