import React, { Component } from "react";
import { ControlledTabs } from "./ControlledTabs";
import { TabId } from "./TabId";

export interface Props {
  readonly defaultTabId: TabId;
  readonly onTabChange?: (nextTabId: TabId, prevTabId: TabId) => void;
}

interface State {
  selectedTabId: TabId;
}

export class UncontrolledTabs extends Component<Props, State> {
  state: Readonly<State> = { selectedTabId: this.props.defaultTabId };

  private handleTabChange = (selectedTabId: TabId, previousTabId: TabId) => {
    const { onTabChange } = this.props;
    this.setState({ selectedTabId });
    if (onTabChange !== undefined) {
      onTabChange(selectedTabId, previousTabId);
    }
  };

  render() {
    const {
      children,
      defaultTabId, // unused
      onTabChange, // unused
      ...rest
    } = this.props;

    return (
      <ControlledTabs
        selectedTabId={this.state.selectedTabId}
        onTabChange={this.handleTabChange}
        {...rest}
      >
        {children}
      </ControlledTabs>
    );
  }
}
