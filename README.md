# React context tabs

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A flexible and unopinionated tab interface for React. Tabs and panes to be provided in any order or nesting. Inactive panels can be either unmounted or just hidden from view. Includes an optional minimal base stylesheet, but leaves aesthetics up to you.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
 - [Basic example](#basic-example)
 - [Controlled tabs](#controlled-tabs)
 - [Nesting](#nesting)
- [Styles](#styles)
- [API](#api)
 - [`Tabs`](#tabs)
 - [`TabList`](#tablist)
 - [`Tab`](#tab)
 - [`TabPanel`](#tabpanel)
 - [`PersistentTabPanel`](#persistenttabpanel)
- [Contribute](#contribute)
- [License](#license)

## Install

```console
npm install react-context-tabs --save
```

## Usage

### Basic example

Straight forward tabs!

```jsx
import React from 'react'
import { Tab, TabList, Tabs, TabPanel } from 'react-context-tabs'

export default function TabExample() {
  return (
    <Tabs defaultTabId='home'>
      <TabList>
        <Tab tabId='home'>React context tabs</Tab>
        <Tab tabId='about'>What is it?</Tab>
        <Tab tabId='issues'>I have a problem</Tab>
      </TabList>
      <TabPanel tabId='home'>
        <p>
          Flexible tabs for React
        </p>
      </TabPanel>
      <TabPanel tabId='about'>
        <p>
          A fine React library
        </p>
      </TabPanel>
      <TabPanel tabId='issues'>
        <p>
          Problem? Try our
          <a href="https://github.com/usabilityhub/react-context-tabs/issues">issues</a> page.
        </p>
      </TabPanel>
    </Tabs>
  )
}
```

### Controlled tabs

`Tabs` can be either "[controlled](https://facebook.github.io/react/docs/forms.html#controlled-components)" or "[uncontrolled](https://facebook.github.io/react/docs/forms.html#uncontrolled-components)". Controlled tabs require a `selectedTabId` property.

```jsx
import React, { Component } from 'react'
import { Tab, TabList, Tabs, TabPanel } from 'react-context-tabs'

function getHash() {
  return window.location.hash.slice(1)
}

class HashControlledTabs extends Component {

  constructor(props) {
    super(props)
    this.state = { selectedTabId: getHash() }
    this.handleHashChange = this.handleHashChange.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentDidMount() {
    window.onhashchange = this.handleHashChange
  }

  componentWillUnmount() {
    window.onhashchange = null
  }

  handleHashChange(event) {
    this.setState({ selectedTabId: getHash() })
  }

  handleTabChange(nextTab, prevTab) {
    window.location.hash = nextTab
  }

  render() {
    const { selectedTabId } = this.state

    return (
      <Tabs
        selectedTabId={selectedTabId}
        handleTabChange={this.handleTabChange}
      >
        <TabList>
          <Tab tabId='happy'>Happy</Tab>
          <Tab tabId='sad'>Sad</Tab>
        </TabList>
        <TabPanel tabId='happy'>
          <span style={{ fontSize: 100, transform: 'rotate(0.25turn)' }}>
            :)
          </span>
        </TabPanel>
        <TabPanel tabId='sad'>
          <span style={{ fontSize: 100, transform: 'rotate(0.25turn)' }}>
            :(
          </span>
        </TabPanel>
      </Tabs>
    )
  }
}

```

### Nesting

Thanks to React's [context](https://facebook.github.io/react/docs/context.html) feature, children can be re-ordered or nested as you please.

```jsx
import React from 'react'
import { Tab, TabList, Tabs, TabPanel } from 'react-context-tabs'

function CharacterInformation({ warrior, wizard }) {
  return (
    <Tabs defaultTabId='warrior'>

      <section className='characterInfo'>
        <TabPanel tabId='warrior'>
          <CharacterStats stats={warrior.stats} />
        </TabPanel>
        <TabPanel tabId='wizard'>

          {/* Tabception */}
          <Tabs defaultTabId='stats'>
            <TabList>
              <Tab tabId='stats'>Stats</Tab>
              <Tab tabId='spells'>Spells</Tab>
            </TabList>
            <TabPanel tabId='stats'>
              <CharacterStats stats={wizard.stats} />
            </TabPanel>
            <TabPanel tabId='spells'>
              <CharacterSpells spells={wizard.spells} />
            </TabPanel>
          </Tabs>

        </TabPanel>
      </section>

      {/* Children can be any old component */}
      <marquee>Select your character!</marquee>

      {/* Tabs come after panels */}
      <section className='characterSelection'>
        <TabList>
          <Tab tabId='warrior'>
            Warrior
          </Tab>
          <Tab tabId='wizard'>
            Wizard
          </Tab>
        </TabList>
      </section>
    </Tabs>
  )
}
```

## Styles

A base style sheet is included in the build at [`/lib/styles/base.css`](src/styles/base.css). This just sets appropriate cursor and removes default list styles (for the `TabList`). You'll still need to write your own CSS to make the tabs look how you want.

Each component has a default class name that is the same as its component name. eg:

```html
<div class="Tabs">
  <ul class="TabList">
    <li class="Tab isSelected">First</li>
    <li class="Tab">Second</li>
  </ul>
  <section className="TabPanel">
    First content
  </section>
<!--
  <section className="TabPanel">
    Second content
  </section>
-->
</div>
```

_Note that `PersistentTabPanel` and `TabPanel` both have the same class: `TabPanel`._

## API

### `Tabs`

Parent container to which child components are passed. `Tabs` can be either "[controlled](https://facebook.github.io/react/docs/forms.html#controlled-components)" or "[uncontrolled](https://facebook.github.io/react/docs/forms.html#uncontrolled-components)". Supply either `defaultTabId` for uncontrolled or `selectedTabId` for controlled.

```js
import { Tabs } from 'react-context-tabs'
import Tabs from 'react-context-tabs/Tabs'
```

```jsx
// controlled
<Tabs
  selectedTabId={this.state.selectedTabId}
  onTabChange={(nextTabId, prevTabId) =>
    this.setState({ selectedTadId: nextTabId })
  }
>
  {/* ... */}
</Tabs>

// uncontrolled
<Tabs defaultTabId={initialTabId}>
  {/* ... */}
</Tabs>
```

#### Props
- `defaultTabId`: `any` - The `tabId` of the initially selected tab when uncontrolled.
- `selectedTabId`: `any` - The `tabId` of the currently selected tab when controlled.
- `onTabChange`: `(nextTabId, prevTabId) =>` - Called when the tab changes. Optional for uncontrolled tabs.

### `TabList`

A wrapper component for `Tab`s. This is just a `ul`.

```js
import { TabList } from 'react-context-tabs'
import TabList from 'react-context-tabs/TabList'
```

```jsx
<TabList>
  <Tab tabId='inbox'>Inbox</Tab>
  <Tab tabId='outbox'>Outbox</Tab>
  <Tab tabId='sent'>Sent</Tab>
</TabList>
```

### `Tab`

An individual tab. Has CSS class `Tab`, and `isSelected` or `isDisabled`.

```js
import { Tab } from 'react-context-tabs'
import Tab from 'react-context-tabs/Tab'
```

```jsx
<Tab tabId='home'>
  <Icon icon='house' />
  Home
</Tab>
```

#### Props
- `tabId`: `any` - The ID of the `TabPanel` to show when clicked.
- `disabled`: `bool` - Disallow clicking on this tab.
- `tabindex`: `number` - Allow this tab to be selected with <kbd>tab</kbd>. See [MDN `tabindex` reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex).

### `TabPanel`

Container for each tab's content. `TabPanel`s are removed from the DOM when inactive.

`TabPanel` can be used as children of a [`ReactCSSTransitionGroup`](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup).

```js
import { TabPanel } from 'react-context-tabs'
import TabPanel from 'react-context-tabs/TabPanel'
```

```jsx
<TabPanel tabId='avatar'>
  <img src={`/images/avatars/${user.id}.jpeg`} />
  <span>{ user.name }</span>
</TabPanel>
```

#### Props
- `tabId`: `any` - The ID of the `Tab` that will reveal this panel.

### `PersistentTabPanel`

An alternative to `TabPanel`. `PersistentTabPanel` is *not* removed from the DOM when inactive. Instead it is set to `display: none`. Children will not be rendered until the tab is first revealed.

These panels are useful for tabs that are computationally expensive to render, or need to persist internal state while deselected.

```js
import { PersistentTabPanel } from 'react-context-tabs'
import PersistenTabPanel from 'react-context-tabs/PersistenTabPanel'
```

#### Props
- `tabId`: `any` - The ID of the `Tab` that will reveal this panel.

## Contribute

Questions, bug reports and pull requests welcome. See [GitHub issues](https://github.com/usabilityhub/react-context-tabs/issues).

## License

MIT
