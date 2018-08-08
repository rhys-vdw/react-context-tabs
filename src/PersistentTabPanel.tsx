import React, { PureComponent, StatelessComponent } from "react";
import classNames from "classnames";
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
    if (!this.props.isSelected && nextProps.isSelected) {
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
          style={{ display: isSelected ? undefined : "none" }}
        >
          {children}
        </section>
    );
  }
}

export interface Props {
  readonly tabId: TabId;
  readonly className?: string;
}

export const PersistentTabPanel: StatelessComponent<Props> = ({ tabId, className }) => {
  return (
    <Consumer>{
      ({ selectedTabId }) => (
        <PersistentTabPanelImpl
          isSelected={selectedTabId === tabId}
          className={className}
        />
      )
    }</Consumer>
  );
};
