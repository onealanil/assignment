
export interface StoreItem {
  id: number;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export const QUERY_KEY = "storeItems";

export const fetchStoreItems = async (): Promise<StoreItem[]> => {
  const res = await fetch(
    "https://my.api.mockaroo.com/assignedstore.json?key=1fe5f660"
  );
  if (!res.ok) throw new Error("Failed to fetch store items");
  return res.json();
};