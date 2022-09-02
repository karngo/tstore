const pricingStructure = {
  "Below 250": [0, 250],
  "250 - 300": [250, 300],
  "300 - 500": [300, 500],
  "Above 500": [500],
};

const isPriceInRange = (productPrice, priceRanges) => {
  const priceValues = priceRanges.map(
    (priceRange) => pricingStructure[priceRange]
  );

  return priceValues.some(([lowerLimit, upperLimit]) => {
    if (!upperLimit) {
      return productPrice >= lowerLimit;
    }

    return productPrice >= lowerLimit && productPrice < upperLimit;
  });
};

export { pricingStructure, isPriceInRange };
