describe('firestore rules', () => {
  describe('cart collection rules', () => {
    it.todo(
      'should allow a user to read a cart if the cart id matches the userId'
    )

    it.todo(
      'should not allow a user to read a cart if the cart id does not match the userId'
    )

    it.todo(
      'should allow a user to write to a cart if the cart id matches the userId'
    )

    it.todo(
      'should not allow a user to write to a cart if the cart id does not match the userId'
    )
  })

  describe('inventory rules', () => {
    it.todo('should allow the public to read')
    it.todo('should not allow the public to write')
    it.todo('should allow user of type employee to write')
  })
})
