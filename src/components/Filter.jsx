import React from "react";
import { motion } from "framer-motion";
const Filter = ({
  accountDetails,
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedCurrency,
  setSelectedAvailability,
  fetchItems,
  selectedCategory,
  handleResetButton,
}) => {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    fetchItems();
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
    fetchItems();
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    fetchItems();
  };
  const handleAvailabilityChange = (event) => {
    setSelectedAvailability(event.target.value);
    fetchItems();
  };

  return (
    <div className="col-lg-4 col-12 order mt">
      <div className="">
        <motion.label
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          htmlFor="category"
          className="form-label main-text-color"
        >
          Category:
        </motion.label>
        <motion.select
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          id="category"
          className="w-100"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" selected>
            -- choose category from the list --
          </option>
          {accountDetails.categoriesData.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </motion.select>
        <motion.label
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
          htmlFor="sub_category"
          className="form-label main-text-color pt-3"
        >
          Sub Category:
        </motion.label>
        <motion.select
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.8 }}
          id="sub_category"
          className="w-100"
          onChange={handleSubCategoryChange}
        >
          <option value="" selected>
            -- choose sub category from the list --
          </option>
          {accountDetails.categoriesData.flatMap((category) =>
            category.sub_categories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))
          )}
        </motion.select>
        <motion.label
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.8 }}
          htmlFor="currency"
          className="form-label main-text-color mt-3"
        >
          Currency:
        </motion.label>
        <motion.select
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1 }}
          id="currency"
          className="w-100"
          onChange={handleCurrencyChange}
        >
          <option value="" disabled selected>
            -- choose Currency from the list --
          </option>
          {["Coins", "Crowns", "Free", "Gems"].map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </motion.select>
        <motion.label
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.2 }}
          htmlFor="availability"
          className="form-label main-text-color mt-3"
        >
          Availability:
        </motion.label>
        <motion.select
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.4 }}
          id="availability"
          className="w-100"
          onChange={handleAvailabilityChange}
        >
          <option value="" disabled selected>
            -- choose Availability from the list --
          </option>
          {[true, false].map((availability) => (
            <option key={availability} value={availability}>
              {availability.name ? "Available" : "Hidden"}
            </option>
          ))}
        </motion.select>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="end"
      >
        <button onClick={handleResetButton} className="btn btn-main">
          Clear filter
        </button>
      </motion.div>
    </div>
  );
};

export default Filter;
