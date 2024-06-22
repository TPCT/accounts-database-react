import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SingleAccountCard from "./SingleAccountCard";
import { motion } from "framer-motion";
import LoadingGrow from "./LoadingGrow";
import AccountDetails from "./AccountDetails";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [accountsIsLoading, setAccountsIsLoading] = useState(true);


  /* we will create store, reducer using redux toolkit */
  const [accountsData, setAccountsData] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const [accountDetailsIsLoading, setAccountDetailsIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [buyNowLink, setBuyNowLink] = useState("");
  //

  const [selectedId, setSelectedId] = useState(""); // will be taken from the dynamic parameter :id
  const [page, setPage] = useState(1); // will be taken from the page query string from the url


  /* will be placed in filter component */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [activeReleaseDateSort, setActiveReleaseDateSort] = useState("");
  const [activePriceSort, setActivePriceSort] = useState("");
  //



  const API_LINK = "https://api-accounts.avkngeeks.com"

  const containerRef = useRef(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (selectedId) fetchAccountDetails(selectedId);
  }, [selectedId]);


  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) loadMoreItems();
      }
    };

    containerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      containerRef.current?.removeEventListener("scroll", handleScroll);
  }, [itemsData, page]);

  useEffect(() => {
    if (selectedId) fetchItems();
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedCurrency,
    activeReleaseDateSort,
    activePriceSort,
    selectedAvailability,
    searchTerm
  ]);

  const fetchAccounts = async () => {
    setAccountsIsLoading(true);
    const response = await axios.get(`${API_LINK}/accounts`);
    setAccountsData(response.data);
    setAccountsIsLoading(false);
  };

  const fetchAccountDetails = async (id) => {
    setAccountDetailsIsLoading(true);
    setAccountDetails(null);
    setItemsData([]);
    setPage(1);

    handleResetButton()

    const [
      xpData,
      profileData,
      itemsData,
      itemStatsData,
      accountWorthData,
      categoriesData,
    ] = await Promise.all([
      axios.get(`${API_LINK}/accounts/${id}/xp`),
      axios.get(`${API_LINK}/accounts/${id}/profile`),
      axios.get(`${API_LINK}/accounts/${id}/items`),
      axios.get(`${API_LINK}/accounts/${id}/item_stats`),
      axios.get(`${API_LINK}/accounts/${id}/account_worth`),
      axios.get(`${API_LINK}/accounts/items/categories`),
    ]);
    setAccountDetails({
      xpData: xpData.data,
      profileData: profileData.data,
      itemsData: itemsData.data,
      itemStatsData: itemStatsData.data,
      accountWorthData: accountWorthData.data,
      categoriesData: categoriesData.data,
    });
    setItemsData(itemsData.data);
    setAccountDetailsIsLoading(false);
  };

  const fetchItems = async () => {
    const url = buildUrl();
    const response = await axios.get(url);
    setItemsData(response.data);
  };

  const loadMoreItems = async () => {
    setLoading(true);
    const url = buildUrl({ page });
    const response = await axios.get(url);
    setItemsData((prev) => [...prev, ...response.data]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const buildUrl = (extraParams = {}) => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("keyword", searchTerm);
    if (activePriceSort)
      params.append("price_sort", activePriceSort);
    if (activeReleaseDateSort)
      params.append("release_date_sort", activeReleaseDateSort);
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedSubCategory) params.append("sub_category", selectedSubCategory);
    if (selectedCurrency) params.append("currency", selectedCurrency);
    if (selectedAvailability)
      params.append("availability", selectedAvailability);
    Object.entries(extraParams).forEach(([key, value]) =>
      params.append(key, value)
    );
    return `${API_LINK}/accounts/${selectedId}/items?${params.toString()}`;
  };
  const handleResetButton = () => {
    setSearchTerm("");
    setActivePriceSort("");
    setActiveReleaseDateSort("");
    setSelectedCategory("")
    setSelectedSubCategory("");
    setSelectedCurrency("");
    setSelectedAvailability("");
  };
  return accountsIsLoading ? (
    <LoadingGrow />
  ) : (
    <div id="Home">
      <section>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
              setBuyNowLink={setBuyNowLink}
              handleCardClick={(id) => {
                  setSelectedId(id)
              }}
              selectedId={selectedId}
              buy_now_link={account.buy_now}
              account_gender={account.account_gender}
              title={account.title}
              account_profile_image={account.account_profile_image}
            />
          ))}
        </div>
      </section>

      <section>{accountDetailsIsLoading && <LoadingGrow />}</section>

      {accountDetails && (
        <AccountDetails
        buyNowLink={buyNowLink}
          accountDetails={accountDetails}
          containerRef={containerRef}
          itemsData={itemsData}
          loading={loading}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setSelectedCategory={setSelectedCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          setSelectedCurrency={setSelectedCurrency}
          fetchItems={fetchItems}
          selectedCategory={selectedCategory}
          activeReleaseDateSort={activeReleaseDateSort}
          activePriceSort={activePriceSort}
          setActivePriceSort={setActivePriceSort}
          setSelectedAvailability={setSelectedAvailability}
          setActiveReleaseDateSort={setActiveReleaseDateSort}
          handleResetButton={handleResetButton}
        />
      )}
    </div>
  );
};
