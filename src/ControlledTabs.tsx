import React, { ChildContextProvider, Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  readonly onTabChange: (nextTabId: TabId, prevTabId: TabId) => void;
  readonly selectedTabId: TabId;
}

export class ControlledTabs extends Component<Props> {

  static propTypes = {
    children: PropTypes.node,
    onTabChange: PropTypes.func.isRequired,
    selectedTabId: PropTypes.any.isRequired,
  };

  private setSelectedTabId = (tabId: TabId) => {
    const { onTabChange, selectedTabId } = this.props;
    onTabChange(tabId, selectedTabId);
  }

  render() {
    const {
      onTabChange, // unused
      selectedTabId,
      children,
    } = this.props;
    const { setSelectedTabId } = this;

    return (
      <Provider value={{ selectedTabId, setSelectedTabId }}>
        {children}
      </Provider>
    );
  }
}
