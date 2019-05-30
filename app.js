$(document).ready(function () {
  //This will ensure that everything is loaded before the JS will run. 
  // js way
  // let header = document.getElementsByTagName("h1"); 
  // JQ way 
  // var header = $("h1");  
  // header.text("This is the new text");


  // IF WE WANT TO TARGET ONLY ONE ELEMENT 
  // $("h1:first").text("This is the new text"); 

  // TO GRAB AN ID FROM A DOCUMENT 
  // $("#title").text("This is the new text!"); 

  // HIDE A TEXT
  // $("#title").hide(); 

  $("#plan").on("change", function () {
    var priceText;
    switch (this.value) {
      case "monthly":
        priceText = '$10.00 /mo';
        break
      case "quarterly":
        priceText = '$9.00 /mo';
        break;
      case "yearly":
        priceText = '$7.00 /mo';
        break;
      default:
        priceText = '$10.00 /mo';
        break;

    }
    $('#price').text(priceText);
  })

  function updateTotal() {
    var total = 0;
    //will show clear buttons if the entry has a length and hide if not
    var entries = $(".entry");
    entries.length ?  $("#empty").show() :  $("#empty").hide();
    // if (entries.length)
    //   $("#empty").show();
    // else
    //   $("#empty").hide();
    $(".entry").each(function (index, entry) {
      var data = $(entry).data();
      var price = parseFloat(data.price);
      var installment = data.plan;
      switch (installment) {
        case 'monthly':
          total += price;
          break;
        case 'quarterly':
          total += price * 4;
          break;
        case 'yearly':
          total += price * 12;
          break;
      }
    })

    $('#total').text('$' + total);
  }

  $('#add').on('click', function () {
    var plan = $('#plan')
    var installment = plan.val();
    var price = $('#price').text();
    var inCart = $('#in_cart');
    // inCart.append('<li>' + installment + ' - ' + price + '</li>')
    var numeric = price.replace(/[[A-Za-z$\/\s]/g, '');
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    // var data = `data-price=" ${numeric} " data-plan= "${installment}" "`
    // inCart.append(`<li> ${installment} - ${price} </li>`); //ES6
    inCart.append('<li class="entry"' + data + '>' + installment + ' - ' + price + '<button class="remove">X</button></li>');

    updateTotal();
  });

  $(document).on("click", ".remove", function () {
    $(this).parents("li").remove(); //will remove parents 
    updateTotal(); //will update the total. 
  }); 

  // Update the cart total and clearing all items 
  $("#empty").on("click", function() {
    $("#in_cart").empty(); 
    updateTotal(); 
  }); 

  // DISPLAY/HIDE CART 
  $("#display_cart").on("click", function() {
    var cart = $("#cart")
    var button = $(this); 

    if (button.text() === "Hide Cart") 
    button.text("Show Cart");
    else 
    button.text("Hide Cart"); 
    // will toggle cart 
    cart.slideToggle(800); 
  }); 

  // PURCHASE 
  $("#purchase").on("click", function() {
    $("#complete")
    // will create element in html 
      .html("<h2> Purchase Complete! </h2>")
      .css({
        "background": "#bca", 
        "width": "25%", 
        "border": "1px solid green", 
        "text-align": "center" 
      })
      .animate({
        width: "70%",
        opacity: 0.4,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "10px"
      }, 1500 );
  })



}); 