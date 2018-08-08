import { TabId } from "./TabId";

export interface Context {
  readonly selectedTabId: TabId;
  readonly setSelectedTabId: (tabId: TabId) => void;
}
