import React from "react";
import { motion } from "framer-motion";

const SingleAccountCard = ({
  index,
  id,
  setBuyNowLink,
  handleCardClick,
  buy_now_link,
  account_gender,
  title,
  account_profile_image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.4 }}
      className={`account-card card  ${
        account_gender === "male" ? "" : "female-bg"
      }`}
      onClick={() => (handleCardClick(id), setBuyNowLink(buy_now_link))}
    >
      <img
        src={account_profile_image}
        height={"250px"}
        className="card-img-top"
        alt={title}
      />
      <div class="card-body">
        <h5 class="card-title mb-2">
          <span className="fw-bold">Title: </span> {title}
        </h5>
        <p class="card-text mb-4">
          <span className="fw-bold">Gender: </span>
          {account_gender}
        </p>

        <a href={buy_now_link} target="_blank" rel="noreferrer">
          <button class="btn btn-primary">Buy Now</button>
        </a>
      </div>
    </motion.div>
  );
};

export default SingleAccountCard;
