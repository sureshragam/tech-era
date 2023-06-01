import {NotFoundContainer, Image, Heading} from './styledComponents'
import Header from '../Header'

const NotFound = () => (
  <NotFoundContainer>
    <Header />
    <Image
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <Heading>Not Found</Heading>
  </NotFoundContainer>
)

export default NotFound
