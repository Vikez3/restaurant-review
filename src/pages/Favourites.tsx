import { useContext } from "react";
import { Link } from "react-router-dom";
import FavouriteCard from "../components/FavouriteCard";
import { RestaurantContext } from "../context/RestourantContext";

export default function Favourites() {
  const { data } = useContext(RestaurantContext);
  const { updateData } = useContext(RestaurantContext);

  const favFn = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();

    const restourants = data.map((item) => {
      if (item.id === id) {
        item.isFavourite = !item.isFavourite;
      }
      return item;
    });
    updateData(restourants);
  };

  let filltered = data.filter((el) => el.isFavourite === true);
  return (
    <div>
      <h1 className="font-weight-bold text-center text-uppercase mb-4">
        your favourite restaurants
      </h1>
      <div className="container filtered">
        {filltered.map((res) => (
          <Link to={`/restourantDetails/${res.id}`} key={`favoutite-${res.id}`}>
            <FavouriteCard
              favFn={(e) => favFn(e, res.id!)}
              reviewList={res.reviewsList}
              id={res.id}
              img={res.image}
              title={res.businessname}
              type={res.restauranttype}
              review={res.reviews}
              isFavourite={res.isFavourite}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
