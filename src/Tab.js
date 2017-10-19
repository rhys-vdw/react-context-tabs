import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Tab extends Component {
  constructor (props, context) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const { selectedTabId, setSelectedTabId } = this.context
    const { disabled, tabId } = this.props
    if (!(selectedTabId === tabId) && !disabled) {
      setSelectedTabId(tabId)
    }
  }

  render () {
    const { children, className, disabled, tabId, ...rest } = this.props
    const { selectedTabId } = this.context

    return (
      <li
        className={classNames('Tab', className, {
          isSelected: selectedTabId === tabId,
          isDisabled: disabled
        })}
        onClick={this.handleClick}
        {...rest}
      >
        {children}
      </li>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  tabId: PropTypes.any.isRequired
}

Tab.contextTypes = {
  selectedTabId: PropTypes.any,
  setSelectedTabId: PropTypes.func.isRequired
}
