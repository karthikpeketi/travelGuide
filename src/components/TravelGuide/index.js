import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TravelPlace from '../TravelPlace'
import './index.css'

const apiStatusCodes = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {
    apiStatus: apiStatusCodes.initial,
    placesArray: [],
  }

  componentDidMount() {
    this.getTravelPlaces()
  }

  formattingToCamelCase = placesData => {
    const toUpdatePlacesArray = placesData.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))
    return toUpdatePlacesArray
  }

  onSuccess = finalData => {
    this.setState({
      apiStatus: apiStatusCodes.success,
      placesArray: finalData,
    })
  }

  onFailure = status => {
    this.setState({apiStatus: apiStatusCodes.failure})
    console.log(status)
  }

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiStatusCodes.inprogress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(this.formattingToCamelCase(data.packages))
      console.log(data)
    } else if (response.ok === false) {
      this.onFailure(response.status)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {placesArray} = this.state
    return (
      <ul className="card-container">
        {placesArray.map(each => (
          <TravelPlace key={each.id} eachPlaceDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <p>failed</p>

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusCodes.success:
        return this.renderSuccessView()
      case apiStatusCodes.failure:
        return this.renderFailureView()
      case apiStatusCodes.inprogress:
        return this.renderLoadingView()
      case apiStatusCodes.initial:
        return null
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="travel-guide-heading">Travel Guide</h1>
        {this.renderBasedOnApiStatus()}
      </div>
    )
  }
}

export default TravelGuide
