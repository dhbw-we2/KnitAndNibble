function zumWarenkorb(item) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    if (warenkorb == null){
        warenkorb = []
    }

    console.log("ES KLAPPT", item)
    warenkorb.push(item)
    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
}