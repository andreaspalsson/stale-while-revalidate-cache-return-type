# stale-while-revalidate-cache-return-type

I ran into a type issue when using this package with a async/await. If you provided an async function the `value` in the result object will be a promised and not the awaited value.

For example if you do this from the readme

```javascript
const result = await swr(
  productId,
  async () => await fetchProductDetails(productId)
);
```

`result.value` will have the type `Promise<Product>` instead of `Product`

If you take example you will get a type error for the provided function

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const result = await swr<Product>(
  productId,
  async () => fetchProductDetails(productId) // Type error: Type 'Promise<Product>' is missing the following properties from type 'Product':
);
```
