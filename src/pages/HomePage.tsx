import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cuisines from '../components/Cuisines'
import PopularRestourants from '../components/PopularRestourants'
import RestourantCard from '../components/RestourantCard'
import { RestaurantContext } from '../context/RestourantContext'


export default function Home() {

  const { data } = useContext(RestaurantContext)
  const { updateData } = useContext(RestaurantContext)

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

  return (
    <div>
      <PopularRestourants data={data} />
      <Cuisines />
      <div className='container'>
        <h1 className='text-uppercase text-center font-weight-bold'>All Restourants</h1>
        <div className="row allres justify-content-center">
          {data.map((res) => (
            <div className='col-19 m-1 mb-3 p-0 card-col' key={res.id}>
              <Link to={`/restourantDetails/${res.id}`} >
                <RestourantCard favFn={(e) => favFn(e, res.id!)} id={res.id} isFavourite={res.isFavourite} img={res.image} title={res.businessname} type={res.restauranttype} reviews={res.reviews} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

