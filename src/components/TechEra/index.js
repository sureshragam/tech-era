import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatusConstrains = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEra extends Component {
  state = {apiStatus: apiStatusConstrains.initial, techList: []}

  componentDidMount() {
    this.getTechList()
  }

  onFetchSuccess = data => {
    const modifiedData = data.map(eachObj => ({
      id: eachObj.id,
      name: eachObj.name,
      logoUrl: eachObj.logo_url,
    }))
    this.setState({
      apiStatus: apiStatusConstrains.success,
      techList: modifiedData,
    })
  }

  onFetchFailure = msg => {
    console.log(msg)
    this.setState({apiStatus: apiStatusConstrains.failure})
  }

  getTechList = async () => {
    this.setState({apiStatus: apiStatusConstrains.initial})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      this.onFetchSuccess(data.courses)
    } else {
      const data = await response.json()
      this.onFetchFailure(data.error_msg)
    }
  }

  renderSuccessView = () => {
    const {techList} = this.state
    return (
      <div className="techEraContentContainer">
        <h1>Courses</h1>
        <ul>
          {techList.map(eachTech => {
            const {id, name, logoUrl} = eachTech
            return (
              <li key={id}>
                <Link to={`/courses/${id}`} className="link">
                  <img src={logoUrl} alt={name} />
                  <p>{name}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="techEraContentContainer" data-testid="loader">
      <Loader type="TailSpin" />
    </div>
  )

  onRetry = () => {
    this.getTechList()
  }

  renderFailureView = () => (
    <div className="FailureViewContainer">
      <img
        className="FailureImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="RetryButton" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSomething = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstrains.initial:
        return this.renderLoadingView()
      case apiStatusConstrains.success:
        return this.renderSuccessView()
      case apiStatusConstrains.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="TechEraContainer">
        <Header />
        {this.renderSomething(apiStatus)}
      </div>
    )
  }
}

export default TechEra
