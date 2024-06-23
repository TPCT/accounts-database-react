const buildQueryString = (
        searchTerm=null,
        activePriceSort=null,
        activeReleaseDateSort=null,
        selectedCategory=null,
        selectedSubCategory=null,
        selectedCurrency=null,
        selectedAvailability=null,
        extraParams={}
) => {
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
    return params.toString();
}


export {
    buildQueryString
}