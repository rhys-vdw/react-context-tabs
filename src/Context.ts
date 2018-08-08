import { TabId } from "./TabId";
import React from "react";

export interface Context {
  readonly selectedTabId: TabId;
  readonly setSelectedTabId: (tabId: TabId) => void;
}

export const { Consumer, Provider } = React.createContext<Context>({
  selectedTabId: undefined!,
  setSelectedTabId: () => { /* empty */},
});
