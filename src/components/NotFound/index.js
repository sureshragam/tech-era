import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <Header />
    <img
      className="image"
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <h1 className="heading">Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
  </div>
)

export default NotFound
