import './index.css'

const TravelPlace = props => {
  const {eachPlaceDetails} = props
  const {name, imageUrl, description} = eachPlaceDetails
  return (
    <li className="list-element">
      <img src={imageUrl} alt={name} className="place-image" />
      <h1 className="place-name">{name}</h1>
      <p className="place-des">{description}</p>
    </li>
  )
}
export default TravelPlace
