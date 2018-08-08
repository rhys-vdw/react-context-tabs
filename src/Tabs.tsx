import React, { StatelessComponent } from "react";
import { UncontrolledTabs, Props as UncontrolledProps } from "./UncontrolledTabs";
import { ControlledTabs, Props as ControlledProps } from "./ControlledTabs";

type Props = UncontrolledProps | ControlledProps;

function isControlled(props: Props): props is ControlledProps {
  return (props as ControlledProps).selectedTabId !== undefined;
}

export const Tabs: StatelessComponent<Props> = (props) => {
  return isControlled(props)
    ? <ControlledTabs {...props} />
    : <UncontrolledTabs {...props} />;
};
