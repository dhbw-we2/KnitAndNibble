function second_address(checked) {
    var hiddenFormItems = document.querySelectorAll('[data-diff-shipping-address]');

    if (checked) {
        hiddenFormItems.forEach(function (item) {
            item.removeAttribute('hidden');
            item.setAttribute('required', '');
        })
    } else {
        hiddenFormItems.forEach(function (item) {
            item.setAttribute('hidden', '');
            item.removeAttribute('required');
        })
    }
}

function order() {

    const form = document.querySelector('.needs-validation');

    if (form.checkValidity()) {
        placeOrder();
    }
    form.classList.add('was-validated');
}

function placeOrder() {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let items = warenkorb.items

    let order_history = JSON.parse(localStorage.getItem('Order_history'))
    if (order_history == null){
        order_history = {}
        order_history.orders = []
    }

    let session_orders = JSON.parse(sessionStorage.getItem('Session_orders'))
    if (session_orders == null){
        session_orders = {}
        session_orders.orders = []
    }

    let order = {}

    let subTotal = document.getElementById("checkout_subTotal").innerHTML
    let shipping = document.getElementById("shipping_cost").innerHTML
    let total = document.getElementById("checkout_total").innerHTML

    items = calculate_total_per_item(items)
    order.items = items

    order.total =[]
    order.total.push(subTotal)
    order.total.push(shipping)
    order.total.push(total)

    let dateTime = new Date()
    order.date = dateTime.toLocaleDateString()
    order.time = dateTime.toLocaleTimeString()

    order_history.orders.push(order)

    localStorage.setItem("Order_history", JSON.stringify(order_history))
    localStorage.removeItem("Warenkorb")

    session_orders.orders.push(order)
    sessionStorage.setItem("Session_orders", JSON.stringify(session_orders))

    window.location.href = "order_confirmation.html"
}

function calculate_total() {
    let shipping_cost = 3
    let free_shipping = 50

    update_total("checkout_subTotal", "checkout_total")
    let subtotal = parseFloat(document.getElementById("checkout_subTotal").innerHTML)

    if (subtotal > free_shipping) {
        document.getElementById("shipping_cost").innerHTML = 0 + "€"
    } else {
        document.getElementById("shipping_cost").innerHTML = shipping_cost + "€"
    }
}

function calculate_total_per_item(items) {
    return items
}