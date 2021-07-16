import { InventoryItem, makeInventory, addItemToInventory } from './index'

describe('inventory module', () => {
  describe('makeInventory', () => {
    it('should return a new inventory', () => {
      expect(makeInventory()).toEqual({
        items: []
      })
    })
  })

  describe('addItemToInventory', () => {
    it('should add an item to the inventory', () => {
      const inventory = makeInventory()

      const item: InventoryItem = {
        id: 'my-item',
        title: 'Nike Shoes',
        description: 'The best shoes ever',
        price: 120,
        stock: 100
      }

      expect(addItemToInventory(item, inventory).items).toContain(item)
    })
  })
})
