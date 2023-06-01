import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import {
  TechDetailsContainer,
  TechDetailsContentContainer,
  Name,
  Description,
  Content,
  Image,
  LoaderContainer,
  FailureViewContainer,
  FailureImage,
  RetryButton,
} from './styledComponents'

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
    console.log('loadingView')
    const {techDetails} = this.state
    const {imageUrl, description, name} = techDetails

    return (
      <TechDetailsContentContainer>
        <Image src={imageUrl} />
        <Content>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </Content>
      </TechDetailsContentContainer>
    )
  }

  renderLoadingView = () => {
    console.log('loadingView')
    return (
      <LoaderContainer>
        <Loader type="TailSpin" />
      </LoaderContainer>
    )
  }

  onRetry = () => {
    this.getTechDetails()
  }

  renderFailureView = () => (
    <FailureViewContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <Name>Oops! Something Went Wrong</Name>
      <Description>
        We cannot seem to find the page you are looking for
      </Description>
      <RetryButton type="button" onClick={this.onRetry}>
        Retry
      </RetryButton>
    </FailureViewContainer>
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
      <TechDetailsContainer>
        <Header />
        {this.renderSomething(apiStatus)}
      </TechDetailsContainer>
    )
  }
}

export default TechDetails
