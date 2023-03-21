
export interface RestaurantType {
    reviews?: number
    parkinglot?: boolean
    phone?: string
    image?: string
    restauranttype?: string
    businessname?: string
    address?: string
    slug?: string
    email?: string
    id?: string
    reviewsList?: ReviewsList[]
    website?: string
    isFavourite?:boolean
}

export interface ReviewsList {
    id: number
    author: string
    comment: string
    stars: number
}
