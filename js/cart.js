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
    }
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
}