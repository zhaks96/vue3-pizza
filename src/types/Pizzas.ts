interface Pizzas {
  id: number;
  category: number;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  sizes: Array<number>;
  types: Array<number>;
  selectedType: number;
  selectedSize: number;
}

export default Pizzas