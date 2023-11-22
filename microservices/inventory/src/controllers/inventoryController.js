const inventory = [
    { id: 1, userId: 1, product: 'Product A' },
    { id: 2, userId: 2, product: 'Product B' },
  ];

exports.getInventory = async (req, res) => {
    res.json(inventory);
}