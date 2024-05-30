function second_address(checked) {
    let hiddenFormItems = document.querySelectorAll('[data-diff-shipping-address]');

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

    save_cart_information(items, order_history)
    let new_order_index = order_history.orders.length-1
    save_personal_information(order_history.orders[new_order_index])

    localStorage.setItem("Order_history", JSON.stringify(order_history))
    localStorage.removeItem("Warenkorb")

    window.location.href = "order_confirmation.html"
}

function save_personal_information(order) {
    order.personal_info = {}
    order.personal_info.first_name = document.getElementById('first-name').value
    order.personal_info.last_name = document.getElementById('last-name').value
    order.personal_info.address = document.getElementById('address').value
    order.personal_info.postal_code = document.getElementById('postal-code').value
    order.personal_info.town = document.getElementById('town').value
    order.personal_info.mobile = document.getElementById('mobile').value
    order.personal_info.email = document.getElementById('email').value
    if(!document.getElementById('shipping_address').hasAttribute('hidden'))  {
        order.personal_info.shipping_address = document.getElementById('shipping_address').value
        order.personal_info.shipping_postal_code = document.getElementById('shipping_zip_code').value
        order.personal_info.town_shipping = document.getElementById('town_shipping').value
    }
    if(document.getElementById('order_notes').value !== null)  {
        order.personal_info.order_notes = document.getElementById('order_notes').value
    }
}

function save_cart_information(items, order_history) {
    let order = {}

    let subTotal = document.getElementById("checkout_subTotal").innerHTML
    let shipping = document.getElementById("shipping_cost").innerHTML
    let total = document.getElementById("checkout_total").innerHTML

    items = calculate_total_per_item(items)
    order.items = items
    order.number = order_history.orders.length+1

    order.subTotal = subTotal
    order.shipping = shipping
    order.total = total

    let dateTime = new Date()
    order.date = dateTime.toLocaleDateString()
    order.time = dateTime.toLocaleTimeString()

    order_history.orders.push(order)

    let index_recent_orders = JSON.parse(sessionStorage.getItem('index_recent_orders'))
    if (index_recent_orders === null){
        index_recent_orders = order_history.orders.length-1
        sessionStorage.setItem("index_recent_orders", JSON.stringify(index_recent_orders))
    }
}

function calculate_total() {
    let warenkorb = JSON.parse(localStorage.getItem("Warenkorb"))
    let shipping_cost = 3
    let free_shipping = 50
    if (warenkorb.subTotal > free_shipping) {
        warenkorb.shippingCost = 0
    } else {
        warenkorb.shippingCost = parseFloat(shipping_cost).toFixed(2) + "€"
    }
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
}

function calculate_total_per_item(items) {
    for(let i in items) {
        items[i].total = parseFloat(items[i].price * items[i].amount).toFixed(2)
    }
    return items
}