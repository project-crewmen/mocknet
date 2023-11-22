exports.users = {
    service: "users",
    apiList: [
        {
            env: "docker",
            api: "http://users:5000/user"
        },
        {
            env: "localhost",
            api: "http://localhost:5000/user"
        }
    ]
}

exports.orders = {
    service: "orders",
    apiList: [
        {
            env: "docker",
            api: "http://orders:5001/order"
        },
        {
            env: "localhost",
            api: "http://localhost:5001/order"
        }
    ]
}

exports.items = {
    service: "items",
    apiList: [
        {
            env: "docker",
            api: "http://items:5002/item"
        },
        {
            env: "localhost",
            api: "http://localhost:5002/item"
        }
    ]
}

exports.inventory = {
    service: "inventory",
    apiList: [
        {
            env: "docker",
            api: "http://inventory:5003/inventory"
        },
        {
            env: "localhost",
            api: "http://localhost:5003/inventory"
        }
    ]
}

exports.email = {
    service: "email",
    apiList: [
        {
            env: "docker",
            api: "http://email:5004/email"
        },
        {
            env: "localhost",
            api: "http://localhost:5004/email"
        }
    ]
}

exports.payment = {
    service: "payment",
    apiList: [
        {
            env: "docker",
            api: "http://payment:5005/payment"
        },
        {
            env: "localhost",
            api: "http://localhost:5005/payment"
        }
    ]
}

exports.apis = [
    this.users,
    this.orders,
    this.items,
    this.inventory,
    this.email,
    this.payment
];