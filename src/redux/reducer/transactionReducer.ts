import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	status: string;
	quantity: number;
	total: number;
	initialPrice: number;
}

interface CartState {
	products: Product[];
	totalPrice: number;
	countCart: number;
}

const initialState: CartState = {
	products: [],
	totalPrice: 0,
	countCart: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (
			state: CartState,
			action: PayloadAction<Product>
		): void => {
			const newProduct: Product = action.payload;
			const existingProduct = state.products.find(
				(item) => item.id === newProduct.id
			);

			if (existingProduct) {
				existingProduct.total += 1;
				existingProduct.quantity -= 1;
				state.totalPrice += newProduct.price;
			} else {
				state.countCart += 1;

				state.products.push({
					...newProduct,
					total: 1,
					quantity: newProduct.quantity - 1,
				});
				state.totalPrice += newProduct.price;
			}
		},
		increment: (
			state: CartState,
			action: PayloadAction<number>
		): void => {
			const productId = action.payload;
			const productToIncrement = state.products.find(
				(item) => item.id === productId
			);

			if (productToIncrement) {
				productToIncrement.total += 1;
				productToIncrement.quantity -= 1;
				productToIncrement.initialPrice =
					productToIncrement.price * productToIncrement.total;
				state.totalPrice += productToIncrement.price;
			}
		},
		decrement: (
			state: CartState,
			action: PayloadAction<number>
		): void => {
			const productId = action.payload;
			const productToDecrement = state.products.find(
				(item) => item.id === productId
			);
			if (productToDecrement) {
				if (productToDecrement.total > 1) {
					productToDecrement.total -= 1;
					productToDecrement.quantity += 1;
					productToDecrement.initialPrice =
						productToDecrement.price * productToDecrement.total;
					state.totalPrice -= productToDecrement.price;
				} else {
					state.totalPrice -= productToDecrement.price;
					state.products = state.products.filter(
						(product) => product.id !== productId
					);
					state.countCart -= 1;
				}
			}
		},
		removeFromCart: (
			state: CartState,
			action: PayloadAction<number>
		): void => {
			const productId = action.payload;
			state.products = state.products.filter(
				(product) => product.id !== productId
			);
			state.countCart -= 1;
			const Allprice = state.products.map(
				(state) => state.initialPrice || state.price
			);
			if (Allprice.length > 0)
				state.totalPrice = Allprice?.reduce((a, b) => a + b);
			else state.totalPrice = 0;
		},
		removeAllFromCart: (state: CartState): void => {
			(state.products = []),
				(state.totalPrice = 0),
				(state.countCart = 0);
		},
	},
});

export const {
	addToCart,
	increment,
	decrement,
	removeFromCart,
	removeAllFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
