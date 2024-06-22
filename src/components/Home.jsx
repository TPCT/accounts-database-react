import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SingleAccountCard from "./SingleAccountCard";
import { motion } from "framer-motion";
import LoadingGrow from "./LoadingGrow";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchingAccountData,
  accountLoadingStatus,
} from "../features/accountDetails/accountDetailsSlice";
import { useNavigate } from "react-router-dom";
import { API_LINK } from "../utils/transformData";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // holding all your data
  const accountsData = useSelector(
    (state) => state.accountDetails.accountsData
  );
  const accountsLoadingStatus = useSelector(
    (state) => state.accountDetails.accountsLoading
  );
  /* will be placed in filter component */
  //

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    dispatch(accountLoadingStatus(true));
    const response = await axios.get(`${API_LINK}/accounts`);
    dispatch(fetchingAccountData(response.data));
    dispatch(accountLoadingStatus(false));
  };

  return accountsLoadingStatus ? (
    <LoadingGrow />
  ) : (
    <div id="Home">
      <section>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center main-text-color pt-5"
          >
            Buy Account Avakinlife
          </motion.h2>
        </div>
        <div className="accounts-cards container">
          {accountsData.map((account, i) => (
            <SingleAccountCard
              index={i}
              key={account.id}
              id={account.id}
              handleCardClick={(id) => {
                navigate(`/accountDetails/${id}`);
              }}
              buy_now_link={account.buy_now}
              account_gender={account.account_gender}
              title={account.title}
              account_profile_image={account.account_profile_image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
