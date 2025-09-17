// Store Manager - Simple JavaScript Program

class StoreManager {
  constructor() {
    this.inventory = [];
  }

  // Add a new item
  addItem(name, sku, category, quality, unitPrice, quantity, location) {
    const item = {
      id: Date.now().toString(),
      name,
      sku,
      category,
      quality,
      unitPrice: parseFloat(unitPrice) || 0,
      quantity: parseInt(quantity) || 0,
      location,
      added: new Date(),
    };
    this.inventory.push(item);
    return item;
  }

  // Update an item by ID
  updateItem(id, data) {
    const item = this.inventory.find((i) => i.id === id);
    if (!item) return null;
    Object.assign(item, data);
    return item;
  }

  // Delete an item
  deleteItem(id) {
    this.inventory = this.inventory.filter((i) => i.id !== id);
  }

  // Increase/decrease quantity
  changeQuantity(id, delta) {
    const item = this.inventory.find((i) => i.id === id);
    if (item) {
      item.quantity = Math.max(0, item.quantity + delta);
    }
  }

  // Search items by name, sku, or category
  search(query) {
    query = query.toLowerCase();
    return this.inventory.filter((i) =>
      [i.name, i.sku, i.category, i.location, i.quality]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  // Show stats
  getStats() {
    const totalItems = this.inventory.length;
    const totalValue = this.inventory.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
    return { totalItems, totalValue };
  }

  // Display all inventory
  listItems() {
    console.table(this.inventory);
  }
}

// Example usage
const store = new StoreManager();

store.addItem("Apples", "SKU001", "Fruits", "Fresh", 2.5, 10, "Shelf A");
store.addItem("Milk", "SKU002", "Dairy", "Cold", 1.8, 5, "Fridge");

store.listItems();
console.log("Stats:", store.getStats());

const found = store.search("milk");
console.log("Search result:", found);

store.changeQuantity(found[0].id, -2);
store.listItems();
