export const makeCartDataBaseAdapter = (db) => {
  return {
    save: (cart) => {
      db.push(cart)
    }
  }
}
