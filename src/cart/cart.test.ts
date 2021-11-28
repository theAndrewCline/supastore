import type { InventoryItem } from '../inventory'
import {
  addCouponToCart,
  addItemToCart,
  addShippingToCart,
  Coupon,
  newCart,
  removeCouponFromCart,
  removeItemFromCart,
  totalCart
} from './cart'

describe('cart module', () => {
  describe('newCart', () => {
    it('should be able to create a cart', () => {
      const user_id = 'my-user-id'

      expect(newCart({ user_id })).toEqual({
        user_id,
        items: [],
        sub_total: 0,
        coupons: [],
        total: 0
      })
    })
  })

  describe('addItemToCart', () => {
    it('should be able to add an item to a cart', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item_to_add: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      expect(addItemToCart(item_to_add, initial_cart)).toEqual({
        user_id,
        coupons: [],
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
      const initial_cart = newCart({ user_id })

      const item_to_add: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      expect(addItemToCart(item_to_add, initial_cart, 2)).toEqual({
        user_id,
        coupons: [],
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
  })

  describe('removeItemFromCart', () => {
    it('should be able to remove item from a cart', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item_to_remove: InventoryItem = {
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
      const initial_cart = newCart({ user_id })

      const item_to_remove: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item_to_remove, initial_cart, 2)

      expect(removeItemFromCart(item_to_remove, cart_with_items)).toEqual({
        user_id,
        coupons: [],
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
  })

  describe('addCouponToCart', () => {
    it('should be able to add a flat rate coupon', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupons: Coupon[] = [
        {
          code: 'FLAT20',
          flat: 20
        }
      ]

      expect(addCouponToCart(coupons[0], cart_with_items)).toEqual({
        ...cart_with_items,
        coupons
      })
    })

    it('should be able to add a percent rate coupon', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupons: Coupon[] = [
        {
          code: 'TAKE10',
          percent: 10
        }
      ]

      expect(addCouponToCart(coupons[0], cart_with_items)).toEqual({
        ...cart_with_items,
        coupons
      })
    })

    it('should be able to add a free shipping coupon', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupons: Coupon[] = [
        {
          code: 'FREESHIP',
          freeshipping: true
        }
      ]

      expect(addCouponToCart(coupons[0], cart_with_items)).toEqual({
        ...cart_with_items,
        coupons
      })
    })

    it('should be able to add a compound coupon', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupons: Coupon[] = [
        {
          code: 'CRAZYDEAL',
          flat: 50,
          percent: 20,
          freeshipping: true
        }
      ]

      expect(addCouponToCart(coupons[0], cart_with_items)).toEqual({
        ...cart_with_items,
        coupons
      })
    })

    it('should be able to add multiple coupons', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupon_1: Coupon = {
        code: 'FREESHIP',
        freeshipping: true
      }

      const coupon_2: Coupon = {
        code: 'TAKE10',
        percent: 10
      }

      const with_one_coupon = addCouponToCart(coupon_1, cart_with_items)

      expect(addCouponToCart(coupon_2, with_one_coupon)).toEqual({
        ...cart_with_items,
        coupons: [coupon_1, coupon_2]
      })
    })

    it('should not be able to add the same code twice', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupon: Coupon = {
        code: 'FREESHIP',
        freeshipping: true
      }

      const with_one_coupon = addCouponToCart(coupon, cart_with_items)

      expect(() => {
        addCouponToCart(coupon, with_one_coupon)
      }).toThrowError('Cannot add same coupon twice')
    })
  })

  describe('removeCouponFromCart', () => {
    it('should remove the coupon passed', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)

      const coupon_1: Coupon = {
        code: 'FREESHIP',
        freeshipping: true
      }

      const coupon_2: Coupon = {
        code: 'TAKE10',
        percent: 10
      }

      const with_one_coupon = addCouponToCart(coupon_1, cart_with_items)
      const with_two_coupons = addCouponToCart(coupon_2, with_one_coupon)

      expect(removeCouponFromCart(coupon_2, with_two_coupons)).toEqual(
        with_one_coupon
      )
    })
  })

  describe('addShippingToCart', () => {
    it('should add shipping costs to cart', () => {
      const cost_of_shipping = 5.99

      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      expect(
        addShippingToCart(cost_of_shipping, initial_cart).shipping_cost
      ).toEqual(5.99)
    })
  })

  describe('totalCart', () => {
    it('should be able to calculate sales tax and update final total', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item_to_remove: InventoryItem = {
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
        coupons: [],
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

    it('should update total with flat coupon info', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const coupon: Coupon = {
        code: 'TAKE5',
        flat: 5
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)
      const cart_with_coupon = addCouponToCart(coupon, cart_with_items)
      const sales_tax = 0.1

      expect(totalCart(cart_with_coupon, sales_tax).total).toEqual(
        (cart_with_items.sub_total - coupon.flat) * sales_tax +
          cart_with_items.sub_total -
          coupon.flat
      )
    })

    it('should update total with percent coupon info', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const coupon: Coupon = {
        code: 'TAKE5',
        percent: 5
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)
      const cart_with_coupon = addCouponToCart(coupon, cart_with_items)
      const sales_tax = 0.1

      expect(totalCart(cart_with_coupon, sales_tax).total).toEqual(
        cart_with_items.sub_total * 0.95 * sales_tax +
          cart_with_items.sub_total * 0.95
      )
    })

    it('should apply flat rate before precent', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const coupon_1: Coupon = {
        code: 'TAKE5',
        flat: 5
      }

      const coupon_2: Coupon = {
        code: 'TAKE5%',
        percent: 5
      }

      const cart_with_items = addItemToCart(item, initial_cart, 2)
      const cart_with_coupon_1 = addCouponToCart(coupon_1, cart_with_items)
      const cart_with_coupon_2 = addCouponToCart(coupon_2, cart_with_coupon_1)
      const sales_tax = 0.1

      expect(totalCart(cart_with_coupon_2, sales_tax).total).toEqual(
        (cart_with_coupon_2.sub_total - 5) * 0.95 * sales_tax +
          (cart_with_coupon_2.sub_total - 5) * 0.95
      )
    })

    it('should include shipping costs if added', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cost_of_shipping = 5.99

      const cart_with_items = addItemToCart(item, initial_cart, 2)
      const cart_with_shipping_cost = addShippingToCart(
        cost_of_shipping,
        cart_with_items
      )

      const sales_tax = 0.1

      expect(totalCart(cart_with_shipping_cost, sales_tax).total).toEqual(
        cart_with_items.sub_total * sales_tax +
          cart_with_items.sub_total +
          cost_of_shipping
      )
    })

    it('should not count shipping costs if coupon is added', () => {
      const user_id = 'my-user-id'
      const initial_cart = newCart({ user_id })

      const item: InventoryItem = {
        id: 'nike-shoe-12345',
        title: 'Nike Shoes',
        description: 'Really cool black shoes',
        price: 60.0,
        stock: 121
      }

      const cost_of_shipping = 5.99

      const cart_with_items = addItemToCart(item, initial_cart, 2)
      const cart_with_shipping_cost = addShippingToCart(
        cost_of_shipping,
        cart_with_items
      )

      const coupon: Coupon = {
        code: 'FREESHIP',
        freeshipping: true
      }

      const cart_with_coupon = addCouponToCart(coupon, cart_with_shipping_cost)

      const sales_tax = 0.1

      expect(totalCart(cart_with_coupon, sales_tax).total).toEqual(
        cart_with_items.sub_total * sales_tax + cart_with_items.sub_total
      )
    })
  })
})

