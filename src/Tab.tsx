import React, { Component, MouseEventHandler } from "react";
import { Context } from "./Context";
import PropTypes from "prop-types";
import classNames from "classnames";

interface Props {
  readonly handleClick: MouseEventHandler<HTMLLIElement>;
  readonly disabled?: boolean;
  readonly tabId: any;
  readonly className?: string;
}
export class Tab extends Component<Props, {}> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabId: PropTypes.any.isRequired,
  };

  static contextTypes = {
    selectedTabId: PropTypes.any,
    setSelectedTabId: PropTypes.func.isRequired,
  };

  context!: Context;

  private handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    const { selectedTabId, setSelectedTabId } = this.context;
    const { disabled, tabId } = this.props;
    if (!(selectedTabId === tabId) && !disabled) {
      setSelectedTabId(tabId);
    }
  }

  render() {
    const { children, className, disabled, tabId, ...rest } = this.props;
    const { selectedTabId } = this.context;

    return (
      <li
        className={classNames("Tab", className, {
          isDisabled: disabled,
          isSelected: selectedTabId === tabId,
        })}
        onClick={this.handleClick}
        {...rest}
      >
        {children}
      </li>
    );
  }
}
