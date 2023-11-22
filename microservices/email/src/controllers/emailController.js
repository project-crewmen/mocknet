const email = [
    { id: 1, userId: 1, product: 'Product A' },
    { id: 2, userId: 2, product: 'Product B' },
  ];

exports.getEmails = async (req, res) => {
    res.json(email);
}