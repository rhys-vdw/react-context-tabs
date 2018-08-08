import React, { ChildContextProvider, Component } from "react";
import PropTypes from "prop-types";
import { Context } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  readonly onTabChange: (nextTabId: TabId, prevTabId: TabId) => void;
  readonly selectedTabId: TabId;
}

export class ControlledTabs extends Component<Props> implements ChildContextProvider<Context> {

  static propTypes = {
    children: PropTypes.node,
    onTabChange: PropTypes.func.isRequired,
    selectedTabId: PropTypes.any.isRequired,
  };

  static childContextTypes = {
    selectedTabId: PropTypes.any,
    setSelectedTabId: PropTypes.func.isRequired,
  };

  private setSelectedTabId = (tabId: TabId) => {
    const { onTabChange, selectedTabId } = this.props;
    onTabChange(tabId, selectedTabId);
  }

  getChildContext(): Context {
    return {
      selectedTabId: this.props.selectedTabId,
      setSelectedTabId: this.setSelectedTabId,
    };
  }

  render() {
    const {
      onTabChange,
      selectedTabId,
      ...rest
    } = this.props;

    return <div {...rest} />;
  }
}
