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
import {buildQueryString} from "../utils/helpers";


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
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const accountDetails = useSelector(
    (state) => state.accountDetails.accountDetails
  );

  const itemsData = useSelector((state) => state.accountDetails.itemsData);

  const changePage = async (direction, page_index=0) => {
    if (direction === "prev" && page <= 1)
      return 1;

    setLoading(true);

    const url = buildUrl({ page: page_index ? page_index :  (direction === "prev") ? page -1 : page + 1 });
    const response = await axios.get(url);

    dispatch(fetchingItemsData(response.data));
    if (direction === "next")
      setPage((prev) => prev + 1);
    else if(direction === "prev")
      setPage((prev) => prev - 1);
    else
      setPage(page_index)

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
    const params = buildQueryString(
        searchTerm,
        activePriceSort,
        activeReleaseDateSort,
        selectedCategory,
        selectedSubCategory,
        selectedCurrency,
        selectedAvailability,
        extraParams
    )

    if (!extraParams['page'])
      setPage(1)
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
    setPage(1)
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
                onClick={() => changePage("prev")}
                hidden={page <= 1}
                className="pagination-card"
            >
              <FaArrowLeft color="#fff"/>
            </button>
            {
              [-2, -1, 0, 1, 2, 3].map((item, index) => (
                  <button
                      onClick={() => changePage(null, page + item)}
                      className="pagination-card"
                      hidden={!(page+item >= 1 && page+item <= itemsData.pages)}
                  >
                    <span className={page === page + item ? "text-black-50" : "text-white"}>{page + item}</span>
                  </button>
              ))
            }

            <button
                hidden={page >= itemsData.pages}
                onClick={() => changePage("next")} className="pagination-card">
              <FaArrowRight color="#fff"/>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SingleAccountDetails;
