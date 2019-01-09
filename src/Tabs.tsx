import React from "react";
import { ControlledTabs, Props as ControlledProps } from "./ControlledTabs";
import { Props as UncontrolledProps, UncontrolledTabs } from "./UncontrolledTabs";

export type Props = UncontrolledProps | ControlledProps;

function isControlled(props: Props): props is ControlledProps {
  return (props as ControlledProps).selectedTabId !== undefined;
}

export function Tabs(props: Props) {
  return isControlled(props)
    ? <ControlledTabs {...props} />
    : <UncontrolledTabs {...props} />;
}
