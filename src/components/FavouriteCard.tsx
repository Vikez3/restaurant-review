import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { ReviewsList } from "../interfaces/types"

type Props = {
    id?: string
    title?: string
    img?: string,
    type?: string,
    review?: number
    isFavourite?: Boolean
    reviewList?: ReviewsList[]
    favFn?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void
}

export default function FavouriteCard({ title, img, type, review, isFavourite, id, favFn, reviewList }: Props) {

    const [stars, setStars] = useState(0)

    useEffect(() => {
        if (reviewList !== undefined) {
            let reviewSum = 0

            for (let i = 0; i < reviewList!.length; i++) {
                reviewSum += reviewList![i].stars;
            }
            let rating = reviewSum / review!
            if (rating > 0) {
                setStars(rating)

            }
        }
    }, [])


    return (
        <div className='favourite-card mb-4'>
            <div className='favourite-card-img position-relative' style={{ backgroundImage: `url(${img})` }}>
                <div className='favourite-card-icon' onClick={(e) => favFn!(e, id!)}>{!isFavourite ? <FaRegHeart /> : <FaHeart />}</div>
            </div>
            <div className='favourite-card-body'>
                <h4>{title}</h4>
                <p className='card-type'>{type}</p>
                <p>rating - {stars}</p>
                <p>bassed on {review} reviews</p>
            </div>
        </div >
    )
}