import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function TabPanel ({ children, className, tabId }, { selectedTabId }) {
  return tabId === selectedTabId && (
    <section className={classNames('TabPanel', className)}>
      {children}
    </section>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  tabId: PropTypes.any.isRequired
}

TabPanel.contextTypes = {
  selectedTabId: PropTypes.any
}
