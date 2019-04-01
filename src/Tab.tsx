import classNames from "classnames";
import React, { ReactNode } from "react";
import { Consumer } from "./Context";
import { TabId } from "./TabId";

export interface Props {
  readonly className?: string;
  readonly disabled?: boolean;
  readonly tabId: TabId;
  readonly children: ReactNode;
}

export function Tab(props: Props) {
  const { className, disabled, tabId, ...rest } = props;

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
