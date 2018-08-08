import React, { Component } from "react";
import PropTypes from "prop-types";
import { ControlledTabs } from "./ControlledTabs";
import { TabId } from "./TabId";

export interface Props {
  defaultTabId: TabId;
  onTabChange?: (nextTabId: TabId, prevTabId: TabId) => void;
}

interface State {
  selectedTabId: TabId;
}

export class UncontrolledTabs extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.node,
    defaultTabId: PropTypes.any.isRequired,
    onTabChange: PropTypes.func
  };

  state: Readonly<State> = { selectedTabId: this.props.defaultTabId };

  private handleTabChange = (selectedTabId: TabId, previousTabId: TabId) => {
    const { onTabChange } = this.props;
    this.setState({ selectedTabId });
    if (onTabChange !== undefined) {
      onTabChange(selectedTabId, previousTabId);
    }
  }

  render() {
    const {
      children,
      defaultTabId, onTabChange, // eslint-disable-line no-unused-vars
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
