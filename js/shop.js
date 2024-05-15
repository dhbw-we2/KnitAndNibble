function zumWarenkorb(item_name) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    if (warenkorb == null){
        warenkorb = []
    }

    let item = getItem(item_name)
    let index = findInList(warenkorb, item_name)

    if (index !== -1){
        warenkorb[0].amount ++
    } else {
        item.amount = 1
        warenkorb.push(item)
    }

    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
}

function getItem(item_name)  {
    return SHOP_ITEM.find(({ name }) => name === item_name)
}

function findInList(warenkorb, item_name)   {
    return warenkorb.findIndex((item) => item.name === item_name)
}

// Product Quantity
    function quantityButton(btn) {
        console.log("t")
        var button = $(btn);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
    } else {
        newVal = 0;
    }
    }
        button.parent().parent().find('input').val(newVal);
    }

