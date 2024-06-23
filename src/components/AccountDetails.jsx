import React from "react";
import XpComponent from "./XpComponent";
import AccordionComponentData from "./AccordionComponentData";
import ItemsCards from "./ItemsCards";
import LoadingGrow from "./LoadingGrow";
import Filter from "./Filter";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const AccountDetails = ({
  accountDetails,
  itemsData,
  loading,
  setSearchTerm,
  searchTerm,
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedCurrency,
  activeReleaseDateSort,
  setActiveReleaseDateSort,
  activePriceSort,
  setSelectedAvailability,
  setActivePriceSort,
}) => {
  const accountsData = useSelector(
    (state) => state.accountDetails.accountsData
  );
  return (
    <>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease:"easeOut"}}
          className="fixed-buy-btn"
        >
          <a href={accountsData[0].buy_now} target="_blank" rel="noreferrer">
            <button className="btn btn-primary">Buy Now</button>
          </a>
        </motion.div>
        <h2 className="main-text-color py-1">Additional Details</h2>
        <div className="row row-cols-1 row-cols-lg-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3,ease:"easeOut" }}
            className="col mb-4"
          >
            <XpComponent xpData={accountDetails.xpData} />
          </motion.div>
          <motion.div
            className="col mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease:"easeOut" }}
          >
            <AccordionComponentData
              title="Item Stats"
              slug="Item_Stats"
              itemStatsData={accountDetails.itemStatsData}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease:"easeOut" }}
            className="col mb-4"
          >
            <AccordionComponentData
              title="Profile Data"
              slug="profile_data"
              itemStatsData={accountDetails.profileData}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease:"easeOut" }}
            className="col mb-4"
          >
            <AccordionComponentData
              title="Account Worth Data"
              slug="account_data"
              itemStatsData={accountDetails.accountWorthData}
            />
          </motion.div>
        </div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease:"easeOut" }}
          className="main-text-color py-1"
        >
          Items Details
        </motion.h2>
        <div className="row items-details-container">
          <div className="col-12 mb-3">
            <div className="">
              <motion.label
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease:"easeOut" }}
                htmlFor="searchTerm"
                className="form-label main-text-color"
              >
                Search Term:
              </motion.label>
              <motion.input
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease:"easeOut" }}
                type="text"
                className="form-control"
                placeholder="Search Term..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                id="searchTerm"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease:"easeOut" }}
              className="d-flex flex-column flex-sm-row g-4 pt-3 justify-content-between sorting-container"
            >
              <div className="d-flex">
                <span className="main-text-color pe-3">Release Date: </span>
                <div
                  className={`pointer me-4 ${
                    activeReleaseDateSort === "asc"
                      ? "active-sort-color"
                      : "main-text-color"
                  }`}
                  onClick={() => {
                    if (activeReleaseDateSort === "asc") {
                      setActiveReleaseDateSort("");
                      return;
                    }
                    setActiveReleaseDateSort("asc");
                    setActivePriceSort("");
                  }}
                >
                  <FaSortAmountDown className="me-2 " size={"18px"} />
                  <span>Asc</span>
                </div>
                <div
                  className={`pointer ${
                    activeReleaseDateSort === "desc"
                      ? "active-sort-color"
                      : "main-text-color"
                  }`}
                  onClick={() => {
                    if (activeReleaseDateSort === "desc") {
                      setActiveReleaseDateSort("");
                      return;
                    }
                    setActiveReleaseDateSort("desc");
                    setActivePriceSort("");
                  }}
                >
                  <FaSortAmountDownAlt className="me-1" size={"18px"} />{" "}
                  <span className=" ">desc</span>
                </div>
              </div>
              <div className="d-flex">
                <span className="main-text-color pe-3">Price: </span>
                <div
                  className={`pointer me-4 ${
                    activePriceSort === "asc"
                      ? "active-sort-color"
                      : "main-text-color"
                  }`}
                  onClick={() => {
                    if (activePriceSort === "asc") {
                      setActivePriceSort("");
                      return;
                    }
                    setActivePriceSort("asc");
                    setActiveReleaseDateSort("");
                  }}
                >
                  <FaSortAmountDown className="me-2 " size={"18px"} />
                  <span>Asc</span>
                </div>
                <div
                  className={`pointer ${
                    activePriceSort === "desc"
                      ? "active-sort-color"
                      : "main-text-color"
                  }`}
                  onClick={() => {
                    if (activePriceSort === "desc") {
                      setActivePriceSort("");
                      return;
                    }
                    setActivePriceSort("desc");
                    setActiveReleaseDateSort("");
                  }}
                >
                  <FaSortAmountDownAlt className="me-1" size={"18px"} />{" "}
                  <span className=" ">desc</span>
                </div>
              </div>
            </motion.div>

            <Filter
              accountDetails={accountDetails}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              setSelectedCurrency={setSelectedCurrency}
              setSelectedAvailability={setSelectedAvailability}
            />
          </div>

          <div className="scrollable-container col-12 mb-4">
            <div className="">
              <ItemsCards itemsData={itemsData} />
            </div>
            {loading && <LoadingGrow />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
