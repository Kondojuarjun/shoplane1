$(document).ready(function() {
    console.log("DOM ready!!")
    
    var currentObj=null;
var ProductSection=$("#product");
function createProduct(pobj){
    var LeftColumn=$("<div>").addClass("left-column")
    
    var LeftImage=$("<img>").attr({
        id:"productImg",
        src:pobj.preview
    })
    
    
    LeftColumn.append(LeftImage)
    ProductSection.append(LeftColumn)
    var RightColumn=$("<div>").addClass("right-column")
    
    var ProductDescription=$("<div>").addClass("product-description")
    
    RightColumn.append(ProductDescription)
    var Name=$("<h1>").attr("id","name")
   
    Name.text(pobj.name);
    ProductDescription.append(Name);
    var Brand=$("<h4>").attr("id","brand")
   
    Brand.text(pobj.brand)
    ProductDescription.append(Brand);
    var Price=$("<h3>") 
    Price.text("Prise: Rs ")
    ProductDescription.append(Price);
    var cost=$('<span>').attr("id","price")
    
    cost.text(pobj.price)
    Price.append(cost)
    var DescriptionWrapper=$("<div>").addClass("description")
    
    var DescriptionTitle=$("<h3>");
    DescriptionTitle.text("Description")
    DescriptionWrapper.append(DescriptionTitle);
    var DescriptionText=$("<p>").attr("id","description")
    
    DescriptionText.text(pobj.description)
    DescriptionWrapper.append(DescriptionText)
    ProductDescription.append(DescriptionWrapper);
    var ProductPreviw=$("<div>").addClass("product-previw")
    
    var PreviewTitle=$("<h3>");
    PreviewTitle.text("Product Preview")
    ProductPreviw.append(PreviewTitle);
    var PreviewImage=$("<div>").addClass("previewImg")
   
    ProductPreviw.append(PreviewImage);
    
 
    
    function renderProductImages(url, pos) {
        // <img class="preview-images active" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" />

        var image = $("<img>").attr("src", url).addClass("preview-images");
        if(pos === 0) {
            image.addClass("active");
        }

        image.click(function() {
            $(".preview-images").removeClass("active");
            image.addClass("active");
            $("#productImg").attr("src", url)
        })

        PreviewImage.append(image);
    }
   
    for(var i=0; i<pobj.photos.length; i++) {
        renderProductImages(pobj.photos[i], i);
    }
    ProductDescription.append(ProductPreviw)
    var ButtonWrapper=$("<div>").addClass("btn")
    var button=$("<button>").attr("id","add-to-cart")
    
    button.text("ADD To Cart")

    ButtonWrapper.append(button)
    RightColumn.append(ButtonWrapper) 
    ProductSection.append(RightColumn)     

}
var urlName=location.href.split('=')[1];

console.log("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+urlName)
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+urlName, function(response) {
    var productData = response;
    createProduct(productData);
    var currentObj=productData;
    console.log(currentObj.id)
   
   



var buttons=$("#add-to-cart")
buttons.click(function(){
    alert("clicked");
    buttons.addClass("bigger")
    setTimeout(function(){
        buttons.removeClass("bigger")
    },200)
    
    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];
    console.log(productList);


    var foundAtPos = -1;
   
    for(var i=0; i < productList.length; i++) {
        console.log(productList[i].id);
        if(parseInt(productList[i].id)== parseInt(currentObj.id)) {
            foundAtPos = i;
        }
    }

    if(foundAtPos > -1) {
        productList[foundAtPos].count = productList[foundAtPos].count + 1;
        console.log(productList[foundAtPos].count);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    } else {
        currentObj.count = 1;
        productList.push(currentObj);
        console.log(productList);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    }

    var totalCount = 0;
    for(var i=0; i<productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }

    $('#cart-count').text(totalCount);



})


})

});