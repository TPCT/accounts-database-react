import React from "react";

const singleItemCard = ({
  thumbnail_url,
  category,
  price,
  name,
  currency,
  release_date,
  sub_category,
}) => {
  return (
    <div className="card account-card ">
      <img src={thumbnail_url} height={"200px"}  alt="" />
      <div className="card-body d-flex align-items-start flex-column gap justify-content-between ">
        <div className="">
          <p class="card-title mb-1">
            <span className="fw-bold">Name: </span>
            {name}
          </p>
          <p class="card-text mb-4">
            <span className="fw-bold">Price: </span>
            {price} {currency}
          </p>
        </div>
        <div className="fs-6">
          <span className="fw-bold pe-2">Category: </span>
          <span className="badge rounded-pill ">{category}</span>
        </div>
        <div className=" fs-6">
          <span className="fw-bold pe-2 ">Sub Category: </span>
          <span className="badge rounded-pill secondary">{sub_category}</span>
        </div>
      </div>
    </div>
  );
};

// "price": 6249,
// "name": "Front Row Blue Aster Suit",
// "category": "female01",
// "thumbnail_url": "http://cdn.avkn.co/content/thumbnails/Avakin/female01/female01_torso_frontrowandrogynysuit3f_256.webp",
// "currency": "Coins",
// "mock_id": "GPIDEIZ2AJ",
// "hidden": false,
// "release_date": "2019-03-19T09:25:07Z",
// "sub_category": "torso"
export default singleItemCard;
