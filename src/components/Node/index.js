import {Component} from 'react'
import './index.css'

class Node extends Component {
  constructor(props) {
    super(props)
    const {directoryDetails} = this.props
    const {isEditActive, directoryName} = directoryDetails
    this.state = {
      inputValue: directoryName,
      isActive: isEditActive,
      childNodes: directoryDetails.child,
      isChildNodesVisible: true,
    }
  }

  onChangeInputValue = event => {
    const {directoryDetails} = this.props
    directoryDetails.directoryName = event.target.value
    this.setState({inputValue: directoryDetails.directoryName})
  }

  changesOnDirectoryName = () => {
    const {isActive} = this.state
    const {directoryDetails} = this.props
    directoryDetails.isEditActive = !isActive
    this.setState({isActive: directoryDetails.isEditActive})
  }

  createChildNode = () => {
    const {childNodes} = this.state
    const child = {
      id: Date.now(),
      directoryName: '',
      isEditActive: true,
      child: [],
    }
    const {directoryDetails} = this.props
    directoryDetails.child = [...childNodes, child]
    this.setState({childNodes: [...childNodes, child]})
  }

  deleteDirectory = id => {
    const {childNodes} = this.state
    const index = childNodes.findIndex(item => item.id === id)
    this.setState({
      childNodes: [
        ...childNodes.slice(0, index),
        ...childNodes.slice(index + 1),
      ],
    })
  }

  deleteNode = () => {
    const {directoryDetails, deleteDirectory} = this.props
    deleteDirectory(directoryDetails.id)
  }

  toggleTheVisibilityOfChildNodes = () => {
    this.setState(prevState => ({
      isChildNodesVisible: !prevState.isChildNodesVisible,
    }))
  }

  render() {
    const {inputValue, isChildNodesVisible, isActive, childNodes} = this.state
    return (
      <li className="directory-file">
        <button type="button" onClick={this.toggleTheVisibilityOfChildNodes}>
          {isChildNodesVisible ? '-' : '+'}
        </button>
        <i className="fas fa-grip-lines" />
        <input
          className="input-field"
          onChange={this.onChangeInputValue}
          value={inputValue}
          disabled={!isActive}
          placeholder="Enter Directory Name"
        />
        {isActive ? (
          <button
            onClick={this.changesOnDirectoryName}
            className="check-directory-button"
            type="button"
          >
            <i className="fas fa-check" />
          </button>
        ) : (
          <>
            <button
              onClick={this.createChildNode}
              className="add-directory-button"
              type="button"
            >
              <i className="fas fa-plus" />
            </button>
            <button
              onClick={this.changesOnDirectoryName}
              className="edit-directory-button"
              type="button"
            >
              <i className="fas fa-pen-fancy" />
            </button>
          </>
        )}

        <button
          onClick={this.deleteNode}
          className="remove-directory-button "
          type="button"
        >
          <i className="fas fa-times" />
        </button>

        {isChildNodesVisible && (
          <ul className="child-directories ">
            {childNodes &&
              childNodes.map(item => (
                <Node
                  key={item.id}
                  directoryDetails={item}
                  createChildNode={this.createChildNode}
                  deleteDirectory={this.deleteDirectory}
                />
              ))}
          </ul>
        )}
      </li>
    )
  }
}

export default Node
