import React from 'react'
import Context from './Context'

export default function withContext (Component) {
  return props => {
    return (
      <Context.Consumer>
        {context => <Component {...props} {...context} />}
      </Context.Consumer>
    )
  }
}
