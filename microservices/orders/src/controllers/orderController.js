const orders = [
    { id: 1, userId: 1, product: 'Product A' },
    { id: 2, userId: 2, product: 'Product B' },
  ];

exports.getOrders = async (req, res) => {
    res.status(200).json(orders);
}