$(document).ready(function(){

    console.log("dom loaded")
    
    var list1=$("#clothing-card")
    var list2=$("#accessory-card")
    function creatList(obj,list){
        var grid=$("<div>").addClass("product-card")
        grid.attr("id",obj.id)
        var ancor=$("<a>").attr({
            href:"./index.html"
        })
        var image=$("<img>").attr({
            src:obj.preview,
            alt:obj.name+"pic"
        })
        image.addClass("product-image")
        ancor.append(image)
        grid.append(ancor)
        var details=$("<div>").addClass("product-meta")
        var titleText=$("<h4>")
        titleText.text(obj.name)
        details.append(titleText)
        var brandName=$("<h5>")
        brandName.text(obj.brand)
        details.append(brandName)
        var Price=$("<p>")
        Price.text("Rs "+obj.price)
        details.append(Price)
        ancor.append(details)
        list.append(grid)
    
    }
    
    
    
        $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
            var productList=response;
            console.log(productList)
       
           for(var i=0; i<productList.length; i++){
               if(i<5){
                   console.log(list1)
               creatList(productList[i],list1)
               }
               else{
                creatList(productList[i],list2)
               }
           }
        })
    })