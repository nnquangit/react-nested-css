/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { connectStyle } from '../'

const ObjForTest = connectStyle('.ObjForTest', { fontSize: 12 })(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div>Thử cái nha {this.props.styles.fontSize}</div>)
  }
})

const ObjRootWrapper = connectStyle('.ObjRootWrapper', { '.ObjForTest': { fontSize: 13 } })(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <ObjForTest />
  }
})

const ObjRootChild = connectStyle('.ObjRootChild', { '.ObjForTest': { fontSize: 13 } })(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return this.props.children
  }
})

describe('React nested css', function () {
  beforeEach(function () {
  })

  it('standalone css verify', () => {
    const tree = renderer.create(<ObjForTest />)
    expect(tree.toTree().rendered.props.styles.fontSize).toBe(12)
  })

  it('nested css verify with children', () => {
    const tree = renderer.create(<ObjRootChild><ObjForTest /></ObjRootChild>)
    expect(tree.toTree().rendered.rendered.rendered.props.styles.fontSize).toBe(13)
  })

  it('nested css verify with wrapper', () => {
    const tree = renderer.create(<ObjRootWrapper />)
    expect(tree.toTree().rendered.rendered.rendered.props.styles.fontSize).toBe(13)
  })
})
