import { makeCartDataBaseAdapter } from './cart-db'
import { newCart } from './cart'

describe('Cart Database adapter', () => {
  it('should correctly save cart to data base', () => {
    const db = []
    const adapter = makeCartDataBaseAdapter(db)

    const cart = newCart({ user_id: 1 })

    adapter.save(cart)

    expect(db).toEqual(expect.arrayContaining([cart]))
  })

  it('should correctly save an updated cart to the database', () => {
    const db = []
    const adapter = makeCartDataBaseAdapter(db)

    const cart = newCart({ user_id: 1 })

    adapter.save(cart)

    expect(db).toEqual(expect.arrayContaining([cart]))
  })
})
