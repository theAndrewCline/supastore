import type { ShoppingItem } from '../shopping-item'

export type CartItem = {
  id: string
  title: string
  description: string
  price: number
  quantity: number
}

export type Coupon = {
  code: string
  flat?: number
  percent?: number
  freeshipping?: boolean
}

export type Cart = {
  user_id: string
  items: CartItem[]
  coupons: Coupon[]
  sub_total: number
  shipping_cost?: number
  total: number
}

const updateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

export const makeCart = ({ user_id }): Cart => {
  return {
    user_id,
    items: [],
    coupons: [],
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

export const addCouponToCart = (coupon: Coupon, cart: Cart): Cart => {
  if (cart.coupons.some((c) => coupon.code === c.code)) {
    throw new Error('Cannot add same coupon twice')
  }

  return { ...cart, coupons: [...cart.coupons, coupon] }
}

export const removeCouponFromCart = (coupon: Coupon, cart: Cart): Cart => {
  const coupons = cart.coupons.filter((c) => c.code !== coupon.code)

  return { ...cart, coupons }
}

export const addShippingToCart = (shipping_cost: number, cart: Cart): Cart => {
  return {
    ...cart,
    shipping_cost
  }
}

export const totalCart = (cart: Cart, sales_tax: number): Cart => {
  const total_flat_coupon_reduction = cart.coupons.reduce(
    (acc, value) => (value.flat || 0) + acc,
    0
  )

  const total_percent_coupon_reduction =
    (cart.coupons.reduce((acc, value) => (value.percent || 0) + acc, 0) / 100) *
    (cart.sub_total - total_flat_coupon_reduction)

  const sub_total_with_coupons =
    cart.sub_total -
    total_flat_coupon_reduction -
    total_percent_coupon_reduction

  const coupons_have_free_shipping = cart.coupons.some(
    (coupons) => coupons.freeshipping
  )

  const shipping_cost = coupons_have_free_shipping ? 0 : cart.shipping_cost || 0

  return {
    ...cart,
    total:
      sub_total_with_coupons * sales_tax +
      sub_total_with_coupons +
      shipping_cost
  }
}
