# react-nested-css
Nested css for react native

[![Build Status](https://travis-ci.org/nnquangit/react-nested-css.svg?branch=master)](https://travis-ci.org/nnquangit/react-nested-css)
[![CircleCI](https://circleci.com/gh/nnquangit/react-nested-css/tree/master.svg?style=svg)](https://circleci.com/gh/nnquangit/react-nested-css/tree/master)

# Installation
```
npm install react-nested-css --save
````
# Basic Usage
```javascript
import { View, Text } from 'react-native'
import { connectStyle, cleanStyle } from 'react-nested-css'

const ComponentA = connectStyle('.ComponentA', { 
    fontSize: 12 
})(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<View>
        <Text>
            FontSize: {this.props.styles.fontSize}
        </Text>
    </View>)
  }
})

const Root = connectStyle('.Root', {
    color: '#ff0000', 
    '.ComponentA': { fontSize: 12 } 
})(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<View styles={cleanStyle(this.props.styles)}>
        <ComponentA />
    </View>)
  }
})

```

# Documentation
comming soon