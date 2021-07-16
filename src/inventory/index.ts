export type Inventory = {
  items: InventoryItem[]
}

export type InventoryItem = {
  id: string
  title: string
  description: string
  price: number
  stock: number
}

export const makeInventory = (): Inventory => {
  return {
    items: []
  }
}

export const addItemToInventory = (
  item: InventoryItem,
  inventory: Inventory
): Inventory => {
  return { ...inventory, items: [...inventory.items, item] }
}

export const removeItemFromInventory = () => {}
