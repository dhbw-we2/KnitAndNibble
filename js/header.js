function refresh_header()   {
    let warenkorb = JSON.parse(localStorage.getItem("Warenkorb"))
    render({items: warenkorb.items, num_of_items: warenkorb.num_of_items}, '#navbar')
}