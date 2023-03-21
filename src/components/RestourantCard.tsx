import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { ReviewsList } from '../interfaces/types'

type Props = {
  title?: string,
  img?: string,
  type?: string,
  reviews?: number
  isFavourite?: boolean
  id?: string
  reviewList?: ReviewsList[]
  favFn?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void
}

export default function RestourantCard({ id, title, img, type, reviews, isFavourite, favFn, reviewList }: Props) {


  const [stars, setStars] = useState(0)

  useEffect(() => {
    if (reviewList !== undefined) {
      let reviewSum = 0

      for (let i = 0; i < reviewList!.length; i++) {
        reviewSum += reviewList![i].stars;
      }
      let rating = reviewSum / reviews!
      if (rating > 0) {
        setStars(rating)

      }
    }
  }, [])

  return (
    <div className='card'>
      <div className='card-img'>
        <div className='card-icon' onClick={(e) => favFn!(e, id!)}>{!isFavourite ? <FaRegHeart /> : <FaHeart />}</div>
        <img src={img} alt="" />
      </div>
      <div className='card-body'>
        <h5>{title}</h5>
        <p className='card-type'>{type}</p>
        <ul className='card-list'>
          <li>rating - {stars}</li>
          <li>based on {reviews} reviews</li>
        </ul>
      </div>
    </div>
  )
}
