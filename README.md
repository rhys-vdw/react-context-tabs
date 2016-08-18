# React context tabs

Flexible tabs for React.

## Installation

```console
npm install react-context-tabs
```

## Examples

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
import React from 'react'
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

## Component API

### `Tabs`

- `defaultTabId`: `any` - The `tabId` of the initially selected tab when uncontrolled.
- `selectedTabId`: `any` - The `tabId` of the currently selected tab when controlled.
- `onTabChange`: `(nextTabId, prevTabId) =>` - Called when the tab changes. Optional for uncontrolled tabs.

Parent container to which child components are passed. `Tabs` can be either "[controlled](https://facebook.github.io/react/docs/forms.html#controlled-components)" or "[uncontrolled](https://facebook.github.io/react/docs/forms.html#uncontrolled-components)". Supply either `defaultTabId` for uncontrolled or `selectedTabId` for controlled.

```jsx
// controlled
<Tabs
  selectedTabId={this.state.selectedTabID}
  onTabChange={(nextTabId, prevTabId) => this.setState(nextTabId)}
>
  {/* ... */}
</Tabs>

// uncontrolled
<Tabs defaultTabId={initialTabId}>
  {/* ... */}
</Tabs>

```

### `TabList`

A wrapper component for `Tab`s. This is just a `ul`.

```jsx
<TabList>
  <Tab tabId='inbox'>Inbox</Tab>
  <Tab tabId='outbox'>Outbox</Tab>
  <Tab tabId='sent'>Sent</Tab>
</TabList>
```

### `Tab`

- `tabId`: `any` - The ID of the `TabPanel` to show when clicked.
- `disabled`: `bool` - Disallow clicking on this tab.
- `tabindex`: `number` - Allow this tab to be selected with <kbd>tab</kbd>. See [MDN `tabindex` reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)

An individual tab. Has CSS class `Tab`, and `isSelected` or `isDisabled`.

```jsx
<Tab tabId='home'>
  <Icon icon='house' />
  Home
</Tab>
```

### `TabPanel`

- `tabId`: `any` - The ID of the `Tab` that will reveal this panel.

Container for each tab's content. `TabPanel`s are removed from the DOM when inactive.

`TabPanel` can be used as children of a [`ReactCSSTransitionGroup`](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup).

```jsx
<TabPanel tabId='avatar'>
  <img src={`/images/avatars/${user.id}.jpeg`} />
  <span>{ user.name }</span>
</TabPanel>
```

### `PersistentTabPanel`

- `tabId`: `any` - The ID of the `Tab` that will reveal this panel.

An alternative to `TabPanel`. `PersistentTabPanel` is *not* removed from the DOM when inactive. Instead it is set to `display: none`. Children will not be rendered until the tab is first revealed.

These panels are useful for tabs that are computationally expensive to render, or need to persist internal state while deselected.
