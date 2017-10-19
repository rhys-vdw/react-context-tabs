import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ControlledTabs extends Component {

  constructor (props) {
    super(props)
    this.setSelectedTabId = this.setSelectedTabId.bind(this)
  }

  setSelectedTabId (tabId) {
    const { onTabChange, selectedTabId } = this.props
    onTabChange(tabId, selectedTabId)
  }

  getChildContext () {
    return {
      selectedTabId: this.props.selectedTabId,
      setSelectedTabId: this.setSelectedTabId
    }
  }

  render () {
    const {
      children,
      onTabChange, selectedTabId, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props

    return (
      <div {...rest}>
        {children}
      </div>
    )
  }
}

ControlledTabs.propTypes = {
  children: PropTypes.node,
  selectedTabId: PropTypes.any.isRequired,
  onTabChange: PropTypes.func.isRequired
}

ControlledTabs.childContextTypes = {
  selectedTabId: PropTypes.any,
  setSelectedTabId: PropTypes.func.isRequired
}

class UncontrolledTabs extends Component {
  constructor (props) {
    super(props)
    this.state = { selectedTabId: props.defaultTabId }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (selectedTabId, previousTabId) {
    const { onTabChange } = this.props
    this.setState({ selectedTabId })
    onTabChange && onTabChange(selectedTabId, previousTabId)
  }

  render () {
    const {
      children,
      defaultTabId, onTabChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props

    return (
      <ControlledTabs
        selectedTabId={this.state.selectedTabId}
        onTabChange={this.handleTabChange}
        {...rest}
      >
        {children}
      </ControlledTabs>
    )
  }
}

UncontrolledTabs.propTypes = {
  children: PropTypes.node,
  defaultTabId: PropTypes.any.isRequired,
  onTabChange: PropTypes.func
}

export default function Tabs (props) {
  return props.selectedTabId == null
    ? <UncontrolledTabs {...props} />
    : <ControlledTabs {...props} />
}

Tabs.propTypes = {
  selectedTabId: PropTypes.any
}
