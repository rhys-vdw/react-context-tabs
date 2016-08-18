import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function TabList (props) {
  const { children, className, ...rest } = props
  return (
    <ul className={classNames('TabList', className)} {...rest}>
      {children}
    </ul>
  )
}

TabList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
