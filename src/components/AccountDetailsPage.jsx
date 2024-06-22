import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  accountLoadingStatus,
  fetchingAccountData,
} from "../features/accountDetails/accountDetailsSlice";
import { API_LINK } from "../utils/transformData";
import axios from "axios";
import SingleAccountCard from "./SingleAccountCard";
import LoadingGrow from "./LoadingGrow";
import { motion } from "framer-motion";
import SingleAccountDetails from "./SingleAccountDetails";

const AccountDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [fetchingComplete, setFetchingComplete] = useState(false);
  const accountsLoadingStatus = useSelector(
    (state) => state.accountDetails.accountsLoading
  );

  const fetchAccounts = async () => {
    try {
      dispatch(accountLoadingStatus(true));
      const response = await axios.get(`${API_LINK}/accounts`);
      dispatch(fetchingAccountData(response.data));
      const account = response.data.find(
        (singleAccount) => singleAccount.id === id
      );
      setSelectedAccount(account || null);
      dispatch(accountLoadingStatus(false));
      setFetchingComplete(true);
    } catch (error) {
      console.error("Failed to fetch accounts data:", error);
      dispatch(accountLoadingStatus(false));
      setFetchingComplete(true);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [id]);

  if (accountsLoadingStatus) {
    return <LoadingGrow />;
  }

  if (fetchingComplete && selectedAccount === null) {
    return <Navigate to="/" />;
  }

  return (
    <div id="account-details">
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
        <div className="accounts-cards middle container">
          {selectedAccount && (
            <SingleAccountCard
              key={selectedAccount.id}
              id={selectedAccount.id}
              handleCardClick={(id) => {}}
              buy_now_link={selectedAccount.buy_now}
              account_gender={selectedAccount.account_gender}
              title={selectedAccount.title}
              account_profile_image={selectedAccount.account_profile_image}
            />
          )}
        </div>
          {
            selectedAccount && (
                <SingleAccountDetails/>
            )
          }
      </section>
    </div>
  );
};

export default AccountDetailsPage;
