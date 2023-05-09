import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const swr = createStaleWhileRevalidateCache({
  storage: window.localStorage, // can be any object with getItem and setItem methods
  minTimeToStale: 5000, // 5 seconds
  maxTimeToLive: 600000, // 10 minutes
  serialize: JSON.stringify, // serialize product object to string
  deserialize: JSON.parse, // deserialize cached product string to object
});

async function fetchProductDetails(productId: string): Promise<Product> {
  const response = await fetch(`/api/products/${productId}`);
  const product = (await response.json()) as Product;
  return product;
}

const productId = "product-123456";

// Type error: Type 'Promise<Product>' is missing the following properties from type 'Product':
const result = await swr<Product>(productId, async () =>
  fetchProductDetails(productId)
);

const product = result.value;

const resultTwo = await swr(productId, async () =>
  fetchProductDetails(productId)
);

// value is a Promise<Product> instead of a Product
const productPromise = resultTwo.value;
