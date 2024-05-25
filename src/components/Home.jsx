import React, { useEffect, useRef, useState } from "react";
import SingleAccountCard from "./SingleAccountCard";
import axios from "axios";
import XpComponent from "./XpComponent";
import LoadingGrow from "./LoadingGrow";
import AccordionComponentData from "./AccordionComponentData";
import ItemsCards from "./ItemsCards";

export const Home = () => {
  const [accountsIsLoading, setAccountsIsLoading] = useState(true);
  const [accountsData, setAccountsData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [accountDetailsIsLoading, setAccountDetailsIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  // ===============================>
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsData, setItemsData] = useState([]);
  const [page, setPage] = useState(2); // Start from page 2 as page 1 is already loaded
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const currenciesData = [
    { id: 1, name: "Coins" },
    { id: 2, name: "Crowns" },
    { id: 3, name: "Coins" },
    { id: 4, name: "Coins" },

  ];
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          // User has scrolled to the bottom
          loadMoreItems();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [itemsData, page]);

  const loadMoreItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://5.161.90.55:8000/accounts/${selectedId}/items?page=${page}`
      );
      const newItems = response?.data;
      setItemsData((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more items:", error);
    }
  };

  useEffect(() => {
    setAccountsIsLoading(true);
    const getData = async () => {
      await axios.get("http://5.161.90.55:8000/accounts").then((res) => {
        setAccountsData(res.data);
        setAccountsIsLoading(false);
      });
    };
    getData();
  }, []);

  const handleCardClick = async (id) => {
    setAccountDetails(null);
    setAccountDetailsIsLoading(true);
    setSelectedId(id);
    setItemsData("");

    const [
      xpData,
      profileData,
      itemsData,
      itemStatsData,
      accountWorthData,
      categoriesData,
    ] = await Promise.all([
      axios.get(`http://5.161.90.55:8000/accounts/${id}/xp`),
      axios.get(`http://5.161.90.55:8000/accounts/${id}/profile`),
      axios.get(`http://5.161.90.55:8000/accounts/${id}/items`),
      axios.get(`http://5.161.90.55:8000/accounts/${id}/item_stats`),
      axios.get(`http://5.161.90.55:8000/accounts/${id}/account_worth`),
      axios.get(`http://5.161.90.55:8000/accounts/${id}/items/categories`),
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

  useEffect(() => {
    if (accountDetails && searchTerm === "") {
      setItemsData(accountDetails.itemsData);
      return;
    }
    if (!selectedId) {
      return;
    }
    const getData = setTimeout(async () => {
      await axios
        .get(
          `http://5.161.90.55:8000/accounts/${selectedId}/items?keyword=${searchTerm}&page=1`
        )
        .then((response) => {
          setItemsData(response.data);
        });
    }, 500);

    return () => clearTimeout(getData);
  }, [searchTerm]);

  const handleCategoryChange = async (categoryName) => {
    setSelectedCategory(categoryName);
    await axios
      .get(
        `http://5.161.90.55:8000/accounts/${selectedId}/items?category=${categoryName}`
      )
      .then((response) => {
        setItemsData(response?.data);
      });
  };
  const handleSubCategoryChange = async (categoryName) => {
    await axios
      .get(
        `http://5.161.90.55:8000/accounts/${selectedId}/items?category=${categoryName}&sub_category=${categoryName}`
      )
      .then((response) => {
        setItemsData(response?.data);
      });
  };

  const handleCurrencyChange = async (currency) => {
    await axios
      .get(
        `http://5.161.90.55:8000/accounts/${selectedId}/items?currency=${currency}`
      )
      .then((response) => {
        setItemsData(response?.data);
      });
  };

  if (accountsIsLoading) {
    return <LoadingGrow />;
  }
  return (
    <div id="Home">
      <section>
        <div className="container">
          <h2 className="text-center main-text-color pt-5">
            Buy Account Avakinlife
          </h2>
        </div>
        <div className="accounts-cards container">
          {accountsData?.map((account) => (
            <SingleAccountCard
              id={account.id}
              handleCardClick={handleCardClick}
              key={account.id}
              buy_now_link={account.buy_now}
              account_gender={account.account_gender}
              title={account.title}
              account_profile_image={account.account_profile_image}
            />
          ))}
        </div>
      </section>

      <section>{accountDetailsIsLoading ? <LoadingGrow /> : null}</section>
      {/* Additional Details Section */}
      {accountDetails && (
        <div className="container">
          <h2 className="main-text-color py-4 pb-5">Additional Details</h2>

          <div className="row  row-cols-1 row-cols-lg-2 ">
            <div className="col mb-4">
              <XpComponent xpData={accountDetails.xpData} />
            </div>
            <div className="col mb-4">
              <AccordionComponentData
                title={"Item Stats"}
                slug={"Item_Stats"}
                itemStatsData={accountDetails.itemStatsData}
              />
            </div>
            <div className="col mb-4">
              <AccordionComponentData
                title={"Profile Data"}
                slug={"profile_data"}
                itemStatsData={accountDetails.profileData}
              />
            </div>
            <div className="col mb-4">
              <AccordionComponentData
                title={"Account Worth Data"}
                slug={"account_data"}
                itemStatsData={accountDetails.accountWorthData}
              />
            </div>
          </div>
          <h2 className="main-text-color py-4 pb-5">Items Details</h2>

          <div className="row items-details-container">
            <div className="col-8 mb-3">
              <label
                htmlFor={"searchTerm"}
                className="form-label main-text-color"
              >
                Search Term:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search Term..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                id={"searchTerm"}
              />
            </div>
            <div className="scrollable-container col-8 mb-4" ref={containerRef}>
              <div className="">
                <ItemsCards itemsData={itemsData} />
              </div>
              {loading && <LoadingGrow />}
            </div>
            <div className="col-4 mt">
              <label
                htmlFor={"category"}
                className="form-label main-text-color"
              >
                Category:
              </label>
              <select name="" id="category" className="w-100 ">
                <option value="" disabled selected>
                  -- choose category from the list --
                </option>
                {accountDetails.categoriesData.map((category) => (
                  <option
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {selectedCategory && (
                <>
                  <label
                    htmlFor={"sub_category"}
                    className="form-label main-text-color pt-3"
                  >
                    Sub Category:
                  </label>
                  <select name="" id="sub_category" className="w-100  ">
                    <option value="" disabled selected>
                      -- choose category from the list --
                    </option>
                    {accountDetails.categoriesData.map((category) =>
                      category.sub_categories.map((singleCategory) => (
                        <option
                          key={singleCategory}
                          onClick={() =>
                            handleSubCategoryChange(singleCategory)
                          }
                          value={singleCategory}
                        >
                          {singleCategory}
                        </option>
                      ))
                    )}
                  </select>
                </>
              )}
              <label
                htmlFor={"currency"}
                className="form-label main-text-color mt-3"
              >
                Currency:
              </label>
              <select name="" id="currency" className="w-100 ">
                <option value="" disabled selected>
                  -- choose Currency from the list --
                </option>
                {currenciesData.map((currency) => (
                  <option
                    key={currency.id}
                    onClick={() => handleCurrencyChange(currency.name)}
                    value={currency.name}
                  >
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
