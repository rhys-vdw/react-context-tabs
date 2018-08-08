import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Consumer } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  readonly className?: string;
  readonly disabled?: boolean;
  readonly tabId: TabId;
}

export class Tab extends Component<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabId: PropTypes.any.isRequired,
  };

  render() {
    const { className, disabled, tabId, ...rest } = this.props;

    return (
      <Consumer>
        {({ selectedTabId, setSelectedTabId }) => {
          const isSelected = selectedTabId === tabId;
          const clickHandler = () => {
            setSelectedTabId(tabId);
          };
          return (
            <li
              className={classNames("Tab", className, {
                isDisabled: disabled,
                isSelected
              })}
              onClick={disabled || isSelected ? undefined : clickHandler}
              {...rest}
            />
          );
        }}
      </Consumer>
    );
  }
}
