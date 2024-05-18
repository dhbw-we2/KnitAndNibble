// Product Quantity
function quantityButton(name, operation, btn) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb, name) //unsure, whether its bad style to use a method from a different file?

    if(operation === "plus")    {
        update_quantity(name, ++warenkorb[index].amount, btn.parentElement.previousElementSibling)
    } else if(operation === "minus")    {
        update_quantity(name, --warenkorb[index].amount, btn.parentElement.nextElementSibling)
    }
}

function update_quantity(name, amount_text, textField)  {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let index = findInList(warenkorb, name) //unsure, whether its bad style to use a method from a different file?
    let amount = parseInt(amount_text)

    if(!Number.isInteger(amount) || amount < 1) {
        textField.value = warenkorb[index].amount
    } else {
        textField.value = amount
        warenkorb[index].amount = amount
        item_total(warenkorb[index], textField.parentElement.parentElement.nextElementSibling.firstElementChild) //There definitely is a better way to navigate through these elements
    }
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
    update_total()
}

function item_total(element, textField) {
    textField.textContent = parseFloat(element.price * element.amount).toFixed(2) + '€' //parseFloat is necessary because of rounding errors
}

function update_total() {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    let total = 0
    let shipping_cost = 3
    let free_shipping = 50

    for(let i in warenkorb) {
        total += warenkorb[i].price * warenkorb[i].amount
    }
    total = parseFloat(total).toFixed(2)
    document.getElementById("subtotal").innerHTML = total
    if(total <= free_shipping) {
        total = (parseFloat(total) + shipping_cost).toFixed(2)
    }
    document.getElementById("total").innerHTML = total
}