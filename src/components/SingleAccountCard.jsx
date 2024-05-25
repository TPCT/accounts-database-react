import React from "react";

const SingleAccountCard = ({
  id,
  handleCardClick,
  buy_now_link,
  account_gender,
  title,
  account_profile_image,
}) => {
  return (
    <div
      className={`account-card card ${
        account_gender !== "male" && "female-bg"
      }`}
      onClick={() => handleCardClick(id)}
    >
      <img src={account_profile_image} height={"350px"} className="card-img-top" alt={title} />
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
    </div>
  );
};

export default SingleAccountCard;