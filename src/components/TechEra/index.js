import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  TechEraContainer,
  Heading,
  TechEraContentContainer,
  TechList,
  Tech,
  Logo,
  Name,
} from './styledComponents'
import {
  FailureViewContainer,
  FailureImage,
  RetryButton,
  Description,
} from '../TechDetails/styledComponents'
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
      <TechEraContentContainer>
        <Heading>Courses</Heading>
        <TechList>
          {techList.map(eachTech => {
            const {id, name, logoUrl} = eachTech
            return (
              <Tech key={id}>
                <Link to={`/courses/${id}`} className="link">
                  <Logo src={logoUrl} />
                  <Name>{name}</Name>
                </Link>
              </Tech>
            )
          })}
        </TechList>
      </TechEraContentContainer>
    )
  }

  renderLoadingView = () => (
    <TechEraContentContainer>
      <Loader type="TailSpin" />
    </TechEraContentContainer>
  )

  onRetry = () => {
    this.getTechList()
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
      <TechEraContainer>
        <Header />
        {this.renderSomething(apiStatus)}
      </TechEraContainer>
    )
  }
}

export default TechEra
