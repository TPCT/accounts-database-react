import React from "react";
import { motion } from "framer-motion";
import { changeBuyNowLink } from "../features/accountDetails/accountDetailsSlice";
import {  useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const SingleAccountCard = ({
  index,
  id,
  handleCardClick,
  buy_now_link,
  account_gender,
  title,
  account_profile_image,
}) => {
  const { id:paramsId } = useParams();
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.4 }}
      className={`account-card card  ${
          account_gender === "male" ? "" : "female-bg"
        } ${paramsId === id ? "selected" : ''}`
      }
      id={`account-${id}`}
      onClick={() => {
        handleCardClick(id);
        dispatch(changeBuyNowLink(buy_now_link));
      }
    }
    >
      <img
        src={account_profile_image}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title mb-3 text-center">
          {title}
        </h5>
      </div>
    </motion.div>
  );
};

export default SingleAccountCard;
