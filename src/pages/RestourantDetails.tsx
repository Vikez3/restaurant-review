import { useContext } from "react";
import RestourantDetailComp from "../components/RestourantDetailComp";
import { RestaurantContext } from "../context/RestourantContext";

const RestourantDetails = () => {
  const { data } = useContext(RestaurantContext);

  return (
    <div>
      <RestourantDetailComp data={data!} />
    </div>
  );
};
export default RestourantDetails;
