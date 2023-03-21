import React from 'react'
import { ReviewsList } from '../interfaces/types'

type Props = {
    data: ReviewsList[]
}

export default function ReviewList({ data }: Props) {
    
    return (
        <div className='res-reviews'>
            <h2>Reviews</h2>
            {data.map(rl => (
                <div className='review' key={`rls-${rl.id}`}>
                    <p><b>Author:</b> {rl.author}</p>
                    <p><b>Message:</b> {rl.comment}</p>
                    <p><b>Stars:</b> {rl.stars}</p>
                </div>
            ))}
        </div>
    )
}