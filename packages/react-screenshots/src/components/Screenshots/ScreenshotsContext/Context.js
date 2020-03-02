import React from 'react'

export default React.createContext({
  image: null,
  viewer: null,
  action: null,
  width: 0,
  height: 0,
  stack: [],
  cursor: null
})
