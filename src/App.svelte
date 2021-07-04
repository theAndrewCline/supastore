<script lang="ts">
	import Cart from './Cart.svelte'
	import { cart } from './stores.ts'
	import { addItemToCart } from './cart/cart.ts'
	import type {  ShoppingItem } from './shopping-item/index.ts'

	const dummy_item: ShoppingItem = {
		id: 'dummy_item',
		title: 'Nike Shoes',
		description: 'Best dang shoes',
		price: 200,
		stock: 150
	}

	const handleAddItemClick = () => {
		cart.update((current_cart) => addItemToCart(dummy_item, current_cart))
	}


</script>

<main>
	<Cart />
	<button on:click={handleAddItemClick}>Add Dummy Item</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
