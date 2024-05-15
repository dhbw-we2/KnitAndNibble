function zumWarenkorb(item) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    if (warenkorb == null) {
        warenkorb = []
    }

    console.log("ES KLAPPT", item)
    warenkorb.push(item)
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
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