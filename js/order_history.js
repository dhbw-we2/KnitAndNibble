function show_all_orders()  {
    let order_history = JSON.parse(localStorage.getItem("Order_history"))
    render(order_history, '#order-list')
}

function show_recent_orders()   {
    let recent_index = JSON.parse(sessionStorage.getItem("index_recent_orders"))
    if(recent_index != null)    {
        let order_history = JSON.parse(localStorage.getItem("Order_history"))
        order_history.orders = order_history.orders.slice(recent_index)

        render(order_history, '#order-list')
    } else {
        render(null, '#order-list')
    }

}