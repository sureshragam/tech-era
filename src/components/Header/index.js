import {withRouter} from 'react-router-dom'
import {Navbar, Image, LogoButton} from './styledComponents'

const Header = props => {
  const onCLickLogo = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <Navbar>
      <LogoButton type="button" onClick={onCLickLogo}>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </LogoButton>
    </Navbar>
  )
}

export default withRouter(Header)
