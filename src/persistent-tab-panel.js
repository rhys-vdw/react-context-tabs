import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import shallowEqual from 'shallowequal'

export default class PersistentTabPanel extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      shouldRender: props.tabId === context.selectedTabId,
      isSelected: props.tabId === context.selectedTabId
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const isSelected = nextContext.selectedTabId === nextProps.tabId
    if (isSelected && !this.state.shouldRender) {
      this.setState({ shouldRender: true })
    }
    this.setState({ isSelected })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (!this.state.isSelected && !nextState.isSelected) {
      return false
    }
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context, nextContext)
    )
  }

  render () {
    if (!this.state.shouldRender) {
      return false
    }

    const { children, className } = this.props
    const { isSelected } = this.state

    return (
      <section className={classNames('TabPanel', className)}
        style={{ display: isSelected ? undefined : 'none' }}
      >
        {children}
      </section>
    )
  }
}

PersistentTabPanel.propTypes = {
  children: PropTypes.node,
  tabId: PropTypes.any.isRequired
}

PersistentTabPanel.contextTypes = {
  selectedTabId: PropTypes.any
}
