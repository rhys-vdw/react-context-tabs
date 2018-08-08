import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shallowEqual from "shallowequal";
import { Context } from "./Context";

interface Props {
  readonly tabId: any;
  readonly className?: string;
}

interface State {
  readonly isSelected: boolean;
  readonly shouldRender: boolean;
}

export class PersistentTabPanel extends Component<Props, State, Context> {
  static propTypes = {
    children: PropTypes.node,
    tabId: PropTypes.any.isRequired,
  };

  static contextTypes = {
    selectedTabId: PropTypes.any,
  };

  state: State = {
    isSelected: this.props.tabId === this.context.selectedTabId,
    shouldRender: this.props.tabId === this.context.selectedTabId,
  };

  componentWillReceiveProps(nextProps: Props, nextContext: Context) {
    const isSelected = nextContext.selectedTabId === nextProps.tabId;
    if (isSelected && !this.state.shouldRender) {
      this.setState({ shouldRender: true });
    }
    this.setState({ isSelected });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State, nextContext: Context) {
    if (!this.state.isSelected && !nextState.isSelected) {
      return false;
    }
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  render() {
    if (!this.state.shouldRender) {
      return false;
    }

    const { children, className } = this.props;
    const { isSelected } = this.state;

    return (
      <section className={classNames("TabPanel", className)}
        style={{ display: isSelected ? undefined : "none" }}
      >
        {children}
      </section>
    );
  }
}
