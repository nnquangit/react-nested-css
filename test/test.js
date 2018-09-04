/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { connectStyle } from '../'

const CompTest = connectStyle('.CompTest', { fontSize: 12 })(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div>Thử cái nha {this.props.styles.fontSize}</div>)
  }
})

const RootWrapper = connectStyle('.RootWrapper', { '.CompTest': { fontSize: 13 } })(class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <CompTest />
  }
})

const RootChild = connectStyle('.RootChild', { '.CompTest': { fontSize: 13 } })(class extends React.Component {
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
    const tree = renderer.create(<CompTest />)
    expect(tree.toTree().rendered.props.styles.fontSize).toBe(12)
  })

  it('nested css verify with children', () => {
    const tree = renderer.create(<RootChild><CompTest /></RootChild>)
    expect(tree.toTree().rendered.rendered.rendered.props.styles.fontSize).toBe(13)
  })

  it('nested css verify with wrapper', () => {
    const tree = renderer.create(<RootWrapper />)
    expect(tree.toTree().rendered.rendered.rendered.props.styles.fontSize).toBe(13)
  })
})
