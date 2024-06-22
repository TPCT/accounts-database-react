import React from "react";
import { motion } from "framer-motion";
const singleItemCard = ({
  availability,
  thumbnail_url,
  category,
  price,
  name,
  currency,
  sub_category,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="card account-card item-card w-100"
    >
      <img src={thumbnail_url} height={"100px"} alt="" />
      <div className="card-body d-flex align-items-start flex-column gap justify-content-between ">
        <div className="w-100">
          <div className="card-title mb-2 d-flex justify-content-center w-100 fs-6 text-primary">
            {name}
          </div>
          <div className="d-flex justify-content-center w-100">
            <span className="card-text mb-2 badge rounded-2 bg-primary">
              {price} {currency}
            </span>
          </div>
        </div>
        <div className="d-flex d-md-block justify-content-center flex-column">
          <span className="fw-bold pe-2 data-title">Category: </span>
          <span className="badge rounded-pill ">{category}</span>
        </div>
        <div className="d-flex d-md-block justify-content-center flex-column">
          <span className="fw-bold pe-2 data-title">Sub Category: </span>
          <span className="badge rounded-pill secondary">{sub_category.replaceAll('_', ' ')}</span>
        </div>

        <div className="d-flex d-md-block justify-content-center flex-column">
          <span className="fw-bold pe-2 data-title">Availability: </span>
          <span
              className={`badge rounded-pill ${availability ? 'bg-success' : 'bg-danger'}`}>{availability ? "Available" : "Hidden"}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default singleItemCard;
