let data;
const url = "https://fakestoreapi.com/products";

api.axios.get(url)
     .then(res => data = res.data)
     
intent("show me the product menu",p => {
    p.play({command: "getMenu", data:data})
    p.play("Okay bro")
 
})

intent("Order by $(ORDER_BY name|price|category|ID)",p=>{
    const orderValue = p.ORDER_BY.value
    let orderedMenu = data
    
    switch(orderValue){
        case "name":
            orderedMenu = data.sort((p1,p2)=>p1.title.localeCompare(p2.title))
            break;
        case "category":
            orderedMenu = data.sort((p1,p2)=>p1.category.localeCompare(p2.category))
            break;
        case "price":
            orderedMenu = data.sort((p1,p2)=>p1.price - p2.price)
            break;
        case "ID":
            orderedMenu = data.sort((p1,p2)=>p1.id - p2.id)
            break;
    }
    
    p.play({command:"getMenu",data:orderedMenu})
     p.play(`Ordering by ${orderValue}`)
})

intent("show me only $(CATEGORY  men | women | ) product",p => {
    const categoryValue = p.CATEGORY.value
    let orderedProducts = data
    
    if(categoryValue == "women"){    
        orderedProducts = data.filter(item => item.category == "women's clothing")
    }else if(categoryValue == "men"){
        orderedProducts = data.filter(item => item.category == "men's clothing")
    }
    
    p.play({command: "getMenu", data: orderedProducts})
    p.play(`Please sir, ${categoryValue} products`)
})

intent(`Add product number $(ITEM 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)`,
       `Add product number $(UNAVAILABLE* .*) to cart`,
       p=>{
    if(p.UNAVAILABLE){
        p.play("That item is in unavailable")
    }else{
        const itemIdx = p.ITEM.value
        const addToCard = data.find(item => {
            return item.id == itemIdx
        })
       
        p.play({command:"showCart",data: addToCard})
     p.play(`Product number ${p.ITEM.value} added successfully`)     
    }
  
})

intent("Open my cart",p=>{
    p.play({command:"openCart",data:true})
    p.play("Opening cart")
})

intent("Close my cart",p=>{
    p.play({command:"closeCart",data:false})
    p.play("Closing cart")
})