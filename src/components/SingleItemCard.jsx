import React from "react";
import { motion } from "framer-motion";
const singleItemCard = ({
  index,
  thumbnail_url,
  category,
  price,
  name,
  currency,
  release_date,
  sub_category,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="card account-card "
    >
      <img src={thumbnail_url} height={"100px"} alt="" />
      <div className="card-body d-flex align-items-start flex-column gap justify-content-between ">
        <div className="">
          <p class="card-title mb-1">
            <span className="fw-bold">Name: </span>
            {name}
          </p>
          <p class="card-text mb-2">
            <span className="fw-bold">Price: </span>
            {price} {currency}
          </p>
        </div>
        <div className="mb-2">
          <span className="fw-bold pe-2">Category: </span>
          <span className="badge rounded-pill ">{category}</span>
        </div>
        <div className=" ">
          <span className="fw-bold pe-2 ">Sub Category: </span>
          <span className="badge rounded-pill secondary">{sub_category}</span>
        </div>
      </div>
    </motion.div>
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
