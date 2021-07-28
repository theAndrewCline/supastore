<script lang="ts">
  import { cart } from './stores.ts'
  import type { Cart } from './cart/cart.ts'

  let cart_state: Cart

  const unsubscribe = cart.subscribe((state) => (cart_state = state))
</script>

<div class="container">
  <h1>Cart</h1>
  <ul>
    {#each cart_state.items as item}
      <li>{item.title} - {item.quantity} x ${item.price}</li>
    {/each}
  </ul>
</div>

<style>
  .container {
    background: #e9e9e9;
    border-radius: 5px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  ul {
    list-style: none;
  }

  li {
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 8px;
  }
</style>
