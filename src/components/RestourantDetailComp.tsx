import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantType } from "../interfaces/types";
import ReviewList from "./ReviewList";
import { RestaurantContext } from "../context/RestourantContext";

type Props = {
  data: RestaurantType[];
};

export default function RestourantDetailComp({ data }: Props) {
  const { id } = useParams();
  const currentRestourant = data.find((el) => el.id === id);
  const { updateRes } = useContext(RestaurantContext);

  let reviewList = currentRestourant!.reviewsList;
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewStars, setReviewStars] = useState("");
  const [starsRate, setStarsRate] = useState(0);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (reviewList !== undefined) {
      let reviewSum = 0;

      for (let i = 0; i < reviewList!.length; i++) {
        reviewSum += reviewList![i].stars;
      }
      let rating = reviewSum / currentRestourant!.reviews!;
      if (rating > 0) {
        setStars(rating);
      }
    }
  }, [currentRestourant, reviewList]);

  useEffect(() => {
    if (+reviewStars === 0) {
      setStarsRate(0);
    }
    if (+reviewStars > 1) {
      setStarsRate(1);
    }
    if (+reviewStars > 20) {
      setStarsRate(2);
    }
    if (+reviewStars > 40) {
      setStarsRate(3);
    }
    if (+reviewStars > 60) {
      setStarsRate(4);
    }
    if (+reviewStars > 80) {
      setStarsRate(5);
    }
  }, [reviewStars]);

  const submitFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let reviewObj = {
      id: new Date().valueOf(),
      author: reviewAuthor,
      comment: reviewComment,
      stars: starsRate,
    };
    currentRestourant!.reviews = currentRestourant?.reviews! + 1;
    reviewList?.push(reviewObj);

    fetch(
      `https://restourants.herokuapp.com/restaurants/${currentRestourant!.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRestourant),
      }
    ).then(() => updateRes());
  };

  return (
    <div className="container res-detail">
      <h2>{currentRestourant?.businessname}</h2>
      <div className="res-info">
        <img
          src={currentRestourant?.image}
          alt={currentRestourant?.businessname}
        />
        <p>rating - {stars}</p>
        <p>bassed on {currentRestourant?.reviews} reviews</p>
        <p>{currentRestourant?.phone}</p>
        <p>{currentRestourant?.email}</p>
        <p>{currentRestourant?.slug}</p>
        <p>
          {currentRestourant?.parkinglot
            ? "We have parking lot for you"
            : "We haven`t parking lot"}
        </p>
      </div>

      {reviewList?.length! > 0 && <ReviewList data={reviewList!} />}

      <div className="review-form">
        <h2>Review form</h2>
        <form onSubmit={submitFrom}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setReviewAuthor(e.target.value)}
            value={reviewAuthor}
          />
          <label>Comment</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setReviewComment(e.target.value)}
            value={reviewComment}
          />
          <label>Start</label>
          <input
            type="range"
            className="form-control"
            onChange={(e) => setReviewStars(e.target.value)}
            value={reviewStars}
          />
          <button className="btn btn-success btn-block">Leave a Review</button>
        </form>
      </div>
    </div>
  );
}
