import {Component} from 'react'
import './index.css'

const HEADS_COIN = `https://assets.ccbp.in/frontend/react-js/heads-img.png`
const TAILS_COIN = `https://assets.ccbp.in/frontend/react-js/tails-img.png`

class CoinToss extends Component {
  constructor(props) {
    super(props)
    this.state = {totalCount: 0}
    this.headsCount = 0
    this.tailsCount = 0
    this.headsOrTails = 0
  }

  onClickTossCoin = () => {
    this.headsOrTails = Math.floor(Math.random() * 2)
    if (this.headsOrTails) {
      this.tailsCount += 1
    } else {
      this.headsCount += 1
    }
    this.setState(prevState => ({totalCount: prevState.totalCount + 1}))
  }

  renderImage = () => (
    <img
      className="coin-img"
      src={this.headsOrTails ? TAILS_COIN : HEADS_COIN}
      alt="toss result"
    />
  )

  render() {
    const {totalCount} = this.state
    return (
      <div className="app-container">
        <div className="game-container">
          <h1 className="game-heading">Coin Toss Game</h1>
          <p className="game-caption">Heads (or) Tails</p>
          {this.renderImage()}
          <button
            className="toss-coin-button"
            onClick={this.onClickTossCoin}
            type="button"
          >
            Toss Coin
          </button>
          <div className="toss-results">
            <p className="text-style">{`Total: ${totalCount}`}</p>
            <p className="text-style">{`Heads: ${this.headsCount}`}</p>
            <p className="text-style">{`Tails: ${this.tailsCount}`}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default CoinToss
