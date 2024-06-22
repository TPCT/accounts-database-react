import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AccountDetails from "./AccountDetails";
import LoadingGrow from "./LoadingGrow";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_LINK } from "../utils/transformData";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchingItemsData,
  fetchingSingleAccountDetails,
} from "../features/accountDetails/accountDetailsSlice";

const SingleAccountDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [accountDetailsIsLoading, setAccountDetailsIsLoading] = useState(false);

  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [activeReleaseDateSort, setActiveReleaseDateSort] = useState("");
  const [activePriceSort, setActivePriceSort] = useState("");
  const [page, setPage] = useState(1); // will be taken from the page query string from the url
  const [loading, setLoading] = useState(false);

  const accountDetails = useSelector(
    (state) => state.accountDetails.accountDetails
  );
  const itemsData = useSelector((state) => state.accountDetails.itemsData);
  const changePage = async ({ direction }) => {
    if (direction === "prev" && page === 1) {
      return;
    }
    setLoading(true);
    const url = buildUrl({ page });
    const response = await axios.get(url);
    dispatch(fetchingItemsData(response.data));
    if (direction === "next") {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev - 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchAccountDetails(id);
  }, [id]);

  useEffect(() => {
    if (id) fetchItems();
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedCurrency,
    activeReleaseDateSort,
    activePriceSort,
    selectedAvailability,
    searchTerm,
  ]);
  const fetchAccountDetails = async (id) => {
    setAccountDetailsIsLoading(true);
    dispatch(fetchingSingleAccountDetails(null));
    dispatch(fetchingItemsData([]));
    setPage(1);

    handleResetButton();

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

    dispatch(
      fetchingSingleAccountDetails({
        xpData: xpData.data,
        profileData: profileData.data,
        itemsData: itemsData.data,
        itemStatsData: itemStatsData.data,
        accountWorthData: accountWorthData.data,
        categoriesData: categoriesData.data,
      })
    );
    dispatch(fetchingItemsData(itemsData.data));
    setAccountDetailsIsLoading(false);
  };

  const fetchItems = async () => {
    const url = buildUrl();
    const response = await axios.get(url);
    dispatch(fetchingItemsData(response.data));
  };

  const buildUrl = (extraParams = {}) => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("keyword", searchTerm);
    if (activePriceSort) params.append("price_sort", activePriceSort);
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
    return `${API_LINK}/accounts/${id}/items?${params.toString()}`;
  };

  const handleResetButton = () => {
    setSearchTerm("");
    setActivePriceSort("");
    setActiveReleaseDateSort("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedCurrency("");
    setSelectedAvailability("");
  };
  return (
    <>
      <section>{accountDetailsIsLoading && <LoadingGrow />}</section>

      {accountDetails && (
        <>
          <AccountDetails

            accountDetails={accountDetails}
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

          <div className="d-flex justify-content-center gap-3 pb-5">
            <button
              onClick={()=>changePage("prev")}
              disabled={page === 1}
              className="pagination-card"
            >
              <FaArrowLeft color="#fff" />
            </button>
            <button onClick={()=>changePage("next")} className="pagination-card">
              <FaArrowRight color="#fff" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SingleAccountDetails;
