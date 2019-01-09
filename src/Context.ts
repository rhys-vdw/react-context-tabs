import React from "react";
import { TabId } from "./TabId";

export interface Context {
  readonly selectedTabId: TabId;
  readonly setSelectedTabId: (tabId: TabId) => void;
}

export const { Consumer, Provider } = React.createContext<Context>({
  selectedTabId: undefined!,
  setSelectedTabId: () => {/* empty */},
});
