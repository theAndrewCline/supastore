import type { ShoppingItem } from '../shopping-item'
import { addItemToCart, makeCart, removeItemFromCart, totalCart } from './cart'

describe('cart module', () => {
  it('should be able to create a cart', () => {
    const user_id = 'my-user-id'

    expect(makeCart({ user_id })).toEqual({
      user_id,
      items: [],
      sub_total: 0,
      total: 0
    })
  })

  it('should be able to add an item to a cart', () => {
    const user_id = 'my-user-id'
    const initial_cart = makeCart({ user_id })

    const item_to_add: ShoppingItem = {
      id: 'nike-shoe-12345',
      title: 'Nike Shoes',
      description: 'Really cool black shoes',
      price: 60.0,
      stock: 121
    }

    expect(addItemToCart(item_to_add, initial_cart)).toEqual({
      user_id,
      items: [
        {
          id: 'nike-shoe-12345',
          title: 'Nike Shoes',
          description: 'Really cool black shoes',
          price: 60.0,
          quantity: 1
        }
      ],
      sub_total: 60.0,
      total: 0
    })
  })

  it('should be able to add multiple of one item to the cart', () => {
    const user_id = 'my-user-id'
    const initial_cart = makeCart({ user_id })

    const item_to_add: ShoppingItem = {
      id: 'nike-shoe-12345',
      title: 'Nike Shoes',
      description: 'Really cool black shoes',
      price: 60.0,
      stock: 121
    }

    expect(addItemToCart(item_to_add, initial_cart, 2)).toEqual({
      user_id,
      items: [
        {
          id: 'nike-shoe-12345',
          title: 'Nike Shoes',
          description: 'Really cool black shoes',
          price: 60.0,
          quantity: 2
        }
      ],
      sub_total: 120.0,
      total: 0
    })
  })

  it('should be able to remove item from a cart', () => {
    const user_id = 'my-user-id'
    const initial_cart = makeCart({ user_id })

    const item_to_remove: ShoppingItem = {
      id: 'nike-shoe-12345',
      title: 'Nike Shoes',
      description: 'Really cool black shoes',
      price: 60.0,
      stock: 121
    }

    const cart_with_item = addItemToCart(item_to_remove, initial_cart)

    expect(removeItemFromCart(item_to_remove, cart_with_item)).toEqual(
      initial_cart
    )
  })

  it('should only decreament the quantity of an item if there is more than 1', () => {
    const user_id = 'my-user-id'
    const initial_cart = makeCart({ user_id })

    const item_to_remove: ShoppingItem = {
      id: 'nike-shoe-12345',
      title: 'Nike Shoes',
      description: 'Really cool black shoes',
      price: 60.0,
      stock: 121
    }

    const cart_with_items = addItemToCart(item_to_remove, initial_cart, 2)

    expect(removeItemFromCart(item_to_remove, cart_with_items)).toEqual({
      user_id,
      items: [
        {
          id: 'nike-shoe-12345',
          title: 'Nike Shoes',
          description: 'Really cool black shoes',
          price: 60.0,
          quantity: 1
        }
      ],
      sub_total: 60.0,
      total: 0
    })
  })

  it('should be able to calculate sales tax and update final total', () => {
    const user_id = 'my-user-id'
    const initial_cart = makeCart({ user_id })

    const item_to_remove: ShoppingItem = {
      id: 'nike-shoe-12345',
      title: 'Nike Shoes',
      description: 'Really cool black shoes',
      price: 60.0,
      stock: 121
    }

    const cart_with_items = addItemToCart(item_to_remove, initial_cart, 2)
    const sales_tax = 0.1

    expect(totalCart(cart_with_items, sales_tax)).toEqual({
      user_id,
      items: [
        {
          id: 'nike-shoe-12345',
          title: 'Nike Shoes',
          description: 'Really cool black shoes',
          price: 60.0,
          quantity: 2
        }
      ],
      sub_total: 120.0,
      total: cart_with_items.sub_total * sales_tax + cart_with_items.sub_total
    })
  })

  it.todo('should be able to add a coupon')
  it.todo('should update total with coupon info')
})
