const PRODUCTS_API =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const fetchProductsData = async () => {
  return await fetch(PRODUCTS_API).then((res) => res.json());
};

export { fetchProductsData };
