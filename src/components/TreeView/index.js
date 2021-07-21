import {Component} from 'react'
import Node from '../Node'
import './index.css'

class TreeView extends Component {
  state = {
    directoriesList: [],
  }

  createNewDirectory = () => {
    const {directoriesList} = this.state
    const newItem = {
      id: Date.now(),
      directoryName: '',
      isEditActive: true,
      child: [],
    }
    this.setState({directoriesList: [...directoriesList, newItem]})
  }

  createChildNode = parentId => {
    const {directoriesList} = this.state
    const indexOfDirectory = directoriesList.findIndex(
      item => item.id === parentId,
    )
    const directory = directoriesList[indexOfDirectory]
    const newItem = {
      id: Date.now(),
      directoryName: '',
      isEditActive: true,
      child: [],
    }

    directory.child = [...directory.child, newItem]

    directoriesList[indexOfDirectory] = directory
    this.setState({directoriesList})
  }

  deleteDirectory = id => {
    const {directoriesList} = this.state
    const index = directoriesList.findIndex(item => item.id === id)
    this.setState({
      directoriesList: [
        ...directoriesList.slice(0, index),
        ...directoriesList.slice(index + 1),
      ],
    })
  }

  render() {
    const {directoriesList} = this.state
    return (
      <div className="app-container">
        <ul className="directories-container">
          {directoriesList &&
            directoriesList.map(listItem => (
              <Node
                key={listItem.id}
                id={listItem.id}
                directoryDetails={listItem}
                createChildNode={this.createChildNode}
                deleteDirectory={this.deleteDirectory}
              />
            ))}
          <li>
            <button
              onClick={this.createNewDirectory}
              className="add-directory-button "
              type="button"
            >
              <i className="fas fa-plus" />
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default TreeView
