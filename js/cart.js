// Product Quantity
function quantityButton(name, operation, btn) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb.items, name) //unsure, whether its bad style to use a method from a different file?

    if(operation === "plus")    {
        update_quantity(name, ++warenkorb.items[index].amount, btn.parentElement.previousElementSibling)
    } else if(operation === "minus")    {
        update_quantity(name, --warenkorb.items[index].amount, btn.parentElement.nextElementSibling)
    }
}

function update_quantity(name, amount_text, textField)  {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb.items, name) //unsure, whether its bad style to use a method from a different file?
    let amount = parseInt(amount_text)

    if(!Number.isInteger(amount) || amount < 1) {
        textField.value = warenkorb.items[index].amount
    } else {
        let old_amount = warenkorb.items[index].amount
        textField.value = amount
        warenkorb.items[index].amount = amount
        warenkorb.items[index].total = warenkorb.items[index].amount * warenkorb.items[index].price
        let amount_diff = amount - old_amount
        warenkorb.num_of_items += amount_diff
        item_total(warenkorb.items[index], textField.parentElement.parentElement.nextElementSibling.firstElementChild) //There definitely is a better way to navigate through these elements
    }
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
    document.getElementById("cart_symbol").innerHTML = warenkorb.num_of_items
    update_total("subtotal_cart", "total_cart")
}

function item_total(element, textField) {
    textField.textContent = parseFloat(element.price * element.amount).toFixed(2) + '€' //parseFloat is necessary because of rounding errors
}

function update_total(idSubTotal, idTotal) {
    let subTotal = getSubTotal()

    document.getElementById(idSubTotal).innerHTML = subTotal + "€"
    let total = getTotal(subTotal)
    document.getElementById(idTotal).innerHTML = total + "€"
}

function getSubTotal() {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let total = 0

    for(let i in warenkorb.items) {
        total += warenkorb.items[i].price * warenkorb.items[i].amount
    }
    return parseFloat(total).toFixed(2)
}

function getTotal(total) {
    let shipping_cost = 3
    let free_shipping = 50

    if(total <= free_shipping) {
        total = (parseFloat(total) + shipping_cost).toFixed(2)
    }
    return total
}

function discard(name, btn) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb.items, name)
    let old_amount = warenkorb.items[index].amount

    let rowIndex = btn.parentElement.parentElement.rowIndex
    //delete the item from the cart page
    document.getElementById("cart_table").deleteRow(rowIndex)
    //delete the item in the local Storage
    warenkorb.items.splice(index, 1)
    //recalculate total item count
    warenkorb.num_of_items -= old_amount
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
    //recalculate the total in the cart page
    update_total("subtotal_cart", "total_cart")
    //update the cart symbol in the navbar
    document.getElementById("cart_symbol").innerHTML = warenkorb.num_of_items
}