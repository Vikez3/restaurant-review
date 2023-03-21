import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestourantContext';
import { RestaurantType } from '../interfaces/types'
import RestourantCard from './RestourantCard';

type Props = {
    data: RestaurantType[]
}

export default function PopularRestourants({ data }: Props) {
    const { updateData } = useContext(RestaurantContext)

    let highestToLowest = data.sort((a, b) => b.reviews! - a.reviews!);
    let top10 = highestToLowest.slice(0, 10)

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
        <div className='container'>
            <h1 className='text-uppercase text-center font-weight-bold mb-4'>our most popular restourants</h1>
            <div className="row allres justify-content-center">
                {top10.map((res) => (
                    <div className='col-19 m-1 mb-3 p-0 card-col' key={`popular-${res.id}`}>
                        <Link to={`/restourantDetails/${res.id}`}>
                            <RestourantCard favFn={(e) => favFn(e, res.id!)} reviewList={res.reviewsList} id={res.id} isFavourite={res.isFavourite} img={res.image} title={res.businessname} type={res.restauranttype} reviews={res.reviews} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}