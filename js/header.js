function refresh_header()   {
    let warenkorb = JSON.parse(localStorage.getItem("Warenkorb"))
    render({items: warenkorb.items}, '#navbar')
}