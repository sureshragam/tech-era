import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstrains = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechDetails extends Component {
  state = {apiStatus: apiStatusConstrains.initial, techDetails: {}}

  componentDidMount() {
    this.getTechDetails()
  }

  onFetchSuccess = data => {
    const modifiedData = {
      id: data.id,
      name: data.name,
      description: data.description,
      imageUrl: data.image_url,
    }
    this.setState({
      apiStatus: apiStatusConstrains.success,
      techDetails: modifiedData,
    })
    console.log(data)
  }

  onFetchFailure = msg => {
    console.log(msg)
    this.setState({
      apiStatus: apiStatusConstrains.failure,
    })
  }

  getTechDetails = async () => {
    this.setState({apiStatus: apiStatusConstrains.initial})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      this.onFetchSuccess(data.course_details)
    } else {
      const data = await response.json()
      this.onFetchFailure(data.error_msg)
    }
  }

  renderSuccessView = () => {
    const {techDetails} = this.state
    const {imageUrl, description, name} = techDetails

    return (
      <div className="techDetailsContentContainer">
        <img className="image" src={imageUrl} alt={name} />
        <div className="content">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="TailSpin" />
    </div>
  )

  onRetry = () => {
    this.getTechDetails()
  }

  renderFailureView = () => (
    <div className="failureViewContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="name">Oops! Something Went Wrong</h1>
      <p className="description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retryButton" type="button" onClick={this.onRetry}>
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
      <div className="techDetailsContainer">
        <Header />
        {this.renderSomething(apiStatus)}
      </div>
    )
  }
}

export default TechDetails
