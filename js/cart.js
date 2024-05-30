// Product Quantity
function quantityButton(name, operation, btn) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb.items, name)

    if(operation === "plus")    {
        update_quantity(name, ++warenkorb.items[index].amount)
    } else if(operation === "minus")    {
        update_quantity(name, --warenkorb.items[index].amount)
    }
}

function update_quantity(name, amount_text)  {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb.items, name)
    let amount = parseInt(amount_text)

    if(Number.isInteger(amount) || amount > 0) {
        let old_amount = warenkorb.items[index].amount
        warenkorb.items[index].amount = amount
        warenkorb.items[index].total = parseFloat(warenkorb.items[index].amount * warenkorb.items[index].price).toFixed(2)
        let amount_diff = amount - old_amount
        warenkorb.num_of_items += amount_diff
    }
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))

    calculate_cart_total()

    refresh()
}

function discard(name) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb.items, name)
    let old_amount = warenkorb.items[index].amount

    warenkorb.items.splice(index, 1)
    //recalculate total item count
    warenkorb.num_of_items -= old_amount
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
    calculate_cart_total()
    refresh()
}

function calculate_cart_total() {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let shipping_cost = 3.00
    warenkorb.subTotal = 0

    for(let i in warenkorb.items)   {
        warenkorb.subTotal += warenkorb.items[i].price * warenkorb.items[i].amount
    }
    warenkorb.total = (warenkorb.subTotal > 50) ? warenkorb.total = warenkorb.subTotal : warenkorb.total = parseFloat(warenkorb.subTotal + shipping_cost).toFixed(2)
    warenkorb.subTotal = parseFloat(warenkorb.subTotal).toFixed(2)
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
}

function refresh()  {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    render(warenkorb, '#cart-body')
}