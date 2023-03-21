import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import RestourantCard from '../components/RestourantCard'
import { RestaurantContext } from '../context/RestourantContext'

export default function CuisineDetail() {

  const { data } = useContext(RestaurantContext)
  const { updateData } = useContext(RestaurantContext)


  const { type } = useParams()

  const favFn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    e.preventDefault()

    const restourants = data.map(item => {
      if (item.id === id) {
        item.isFavourite = !item.isFavourite
      }
      return item
    })
    updateData(restourants)

  }
  let filteredType = data.filter(el => el.restauranttype === type)
  return (
    <div className='container'>
      <h1 className='text-uppercase text-center font-weight-bold'>{type} Restourants</h1>
      <div className="row allres justify-content-center">
        {filteredType.map(res => (
          <div className='col-19 m-1 mb-3 p-0 card-col' key={`type-${res.id}`}>
            <Link to={`/restourantDetails/${res.id}`}>
              <RestourantCard favFn={(e) => favFn(e, res.id!)} isFavourite={res.isFavourite} img={res.image} title={res.businessname} type={res.restauranttype} reviews={res.reviews} />
            </Link>
          </div>
        ))
        }
      </div >
    </div>
  )
}
