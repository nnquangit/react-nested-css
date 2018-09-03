import React from 'react'

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

const mergeDeep = (target, source) => {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) { Object.assign(output, { [key]: source[key] }) } else { output[key] = mergeDeep(target[key], source[key]) }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

export const StyleContext = React.createContext({
  path: ['root'], level: 0, find: (com) => {}
})

export const cleanStyle = (styles) => {
  return Object.keys(styles).reduce(
    (_filtered, _key) => _key.match(/\-|\_|\.|\@/)
      ? { ..._filtered }
      : { ..._filtered, [_key]: styles[_key] },
    {}
  )
}

export const fixStyle = ({ styles, ...props }) => ({ ...props, style: cleanStyle(styles) })

export const propsStyle = (styles, props) => {
  return Object.keys(props).reduce(
    (_styles, _key) => {
      if (props[_key] === false) {
        return _styles
      }
      return { ..._styles, ...(styles['__' + _key] || {}) }
    },
    styles
  )
}

export const connectStyle = (mod, styles = {}) => {
  return (WrappedComponent) => class extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <StyleContext.Consumer>
          {parent => {
            let path = [...parent.path, mod]
            let comStyle = propsStyle(mergeDeep(mergeDeep(styles, this.props.style), parent.find(mod)), this.props)
            // styles// propsStyle(mergeDeep(mergeDeep(styles, this.props.style), parent.find(mod)), this.props)
            // console.log(mod, JSON.stringify(comStyle))
            let comFind = {
              path: path,
              level: parent.level + 1,
              find: (com) => mergeDeep(comStyle[com] || {}, parent.find(com))
            }
            return (<StyleContext.Provider value={comFind}>
              <WrappedComponent {...this.props} styles={comStyle}/>
            </StyleContext.Provider>)
          }}
        </StyleContext.Consumer>
      )
    }
  }
}
