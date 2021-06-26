import type { ShoppingItem } from '../shopping-item'

export type CartItem = {
  id: string
  title: string
  description: string
  price: number
  quantity: number
}

export type Cart = {
  user_id: string
  items: CartItem[]
  sub_total: number
  total: number
}

const updateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

export const makeCart = ({ user_id }): Cart => {
  return {
    user_id,
    items: [],
    sub_total: 0,
    total: 0
  }
}

export const addItemToCart = (
  new_item: ShoppingItem,
  cart: Cart,
  quantity: number = 1
): Cart => {
  const items = [
    ...cart.items,
    {
      id: new_item.id,
      title: new_item.title,
      description: new_item.description,
      price: new_item.price,
      quantity
    }
  ]

  return {
    ...cart,
    items,
    sub_total: updateCartSubtotal(items)
  }
}

export const removeItemFromCart = (
  item_to_remove: ShoppingItem | CartItem,
  cart: Cart
): Cart => {
  const items = cart.items
    .map((item) => {
      if (item.id === item_to_remove.id) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      } else {
        return item
      }
    })
    .filter((item) => item.quantity > 0)

  return {
    ...cart,
    items,
    sub_total: updateCartSubtotal(items)
  }
}

export const totalCart = (cart: Cart, sales_tax: number): Cart => {
  return {
    ...cart,
    total: cart.sub_total * sales_tax + cart.sub_total
  }
}
