import { makeCartDataBaseAdapter } from './cart-db'
import { newCart } from './cart'
import { v4 as uuid } from 'uuid'

describe('Cart Database adapter', () => {
  it('should correctly save cart to data base', () => {
    const db = []
    const adapter = makeCartDataBaseAdapter(db)

    const cart_id = uuid()
    const cart = newCart({ user_id: 1, id: cart_id })

    adapter.save(cart)

    expect(db).toEqual(expect.arrayContaining([cart]))
  })

  it('should correctly save an updated cart to the database', () => {
    const db = []
    const adapter = makeCartDataBaseAdapter(db)

    const cart_id = uuid()
    const cart = newCart({ user_id: 1, id: cart_id })

    adapter.save(cart)

    expect(db).toEqual(expect.arrayContaining([cart]))
  })
})
