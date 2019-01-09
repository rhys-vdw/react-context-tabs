import classNames from "classnames";
import React, { PureComponent, ReactNode } from "react";
import { Consumer } from "./Context";
import { TabId } from "./TabId";

export interface ImplProps {
  readonly className?: string;
  readonly isSelected: boolean;
}

interface State {
  readonly shouldRender: boolean;
}

class PersistentTabPanelImpl extends PureComponent<ImplProps, State> {
  state: State = {
    shouldRender: this.props.isSelected,
  };

  componentWillReceiveProps(nextProps: ImplProps) {
    if (!this.state.shouldRender && nextProps.isSelected) {
      this.setState({ shouldRender: true });
    }
  }

  render() {
    if (!this.state.shouldRender) {
      return null;
    }

    const { children, className, isSelected } = this.props;

    return (
      <section
        className={classNames("TabPanel", className)}
        style={isSelected ? undefined : { display: "none" }}
      >
        {children}
      </section>
    );
  }
}

export interface Props {
  readonly tabId: TabId;
  readonly className?: string;
  readonly children: ReactNode;
}

export function PersistentTabPanel({ tabId, children, className }: Props) {
  return (
    <Consumer>{
      ({ selectedTabId }) => (
        <PersistentTabPanelImpl
          isSelected={selectedTabId === tabId}
          className={className}
        >
          {children}
        </PersistentTabPanelImpl>
      )
    }</Consumer>
  );
}
