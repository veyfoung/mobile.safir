Session.setDefault('nbproducts','');
Session.setDefault('querylimit',16);
Session.setDefault('quickview','');


Template.listproducts.rendered=function(){
	$('#slider').flexslider({
					animation: "slide",
					directionNav: true,
					animationLoop: true,
					controlNav: false,
					slideToStart: 1,
					slideshow: true,
					animationDuration: 300,
					start: function(){
						 $('#slider').animate({opacity: 1}, 750);
					},
				});
									
};

Template.listproducts.helpers({
	nbproducts: function(){
		return Session.get('nbproducts');
	},
	isLiked: function(productId){
		if(Session.get('userId')){
    		  var ses=Session.get('userId');
	          var data=  favorite.find({userId:ses});
	          var object=[];
	          var obj={};
	          var found=false;
	          data.forEach(function(entry) {
	            var proid=entry.proId;
	            if(proid==productId){
	            	//console.log(productId+'=>'+proid+ " favorite?");
	            	found=true;
	            }
	            	
	                
	           });
	          
        		return found;
    	}else{
    		//console.log(productId+' isNotFavorite');
    		return false;
    	}
    		
	},

	getProduct: function(id){
		return products.findOne({"_id":id});
	},
	getSelectedProduct: function(){
		var id=Session.get('quickview');
		if(id=='')
			return null;
		var currentProduct=products.find({"_id":id});
		return currentProduct;
	},
	getShop: function(){
		return shops.find({});
	},
	getShopname: function( id ){
		var shop = shops.findOne({_id:id });
		if( shop ) return shop.name; 
	},
	limitText:function(title){
		//alert('mytitle:'+title);
		var length = 30;
		var trimmedString = title.substring(0, length);
		return trimmedString+"...";
	}

});


Template.listproducts.events({

	'click #favorite':function(e,tpl){
	             e.preventDefault();
	             var id=this._id;
	             console.log('Want to add this into favorite:'+Session.get('userId'));

	             var css=$(e.currentTarget).attr("class");
	             console.log("css= "+css);
	             if(css=="fa fa-heart red pull-right"){
	             	Meteor.call('deleteFavorite',id);
	             	console.log('success');
	             	
	             }else{
	             		if(Session.get('userId')){
		                 //alert();
		                 var obj={
		                    proId:id,
		                    userId:Session.get('userId')
		                 }

		                 Meteor.call('insertFavorite',obj);
		                 
		                  alert('Product successfully append to favorite!');
		            }
		            else{
		            	var newId=Random.id();
		                Session.setPersistent('userId',newId);
		                 //var ses=Session.get('userId');
		                 
		                 var obj={
		                    proId:id,
		                    userId:Session.get('userId')
		                 }
						
		                 Meteor.call('insertFavorite',obj);
		                 //alert('Product successfully added to favorite!');
		            }
	             }
	             
	    },
	    'click .more': function(e,tpl){
	    	var limit=Number(Session.get('querylimit'));
	    	limit=limit+16;
	    	Session.set('querylimit',limit);
	    	console.log('limite='+Session.get('querylimit'));
	    },
	    'mouseover .thumbnail': function(e,tpl){
	    	$(e.currentTarget).find('.caption').slideDown(250);
	    	
	    },
	    'mouseleave .thumbnail': function(e,tpl){
	    	$(e.currentTarget).find('.caption').slideUp(250);
	    },
	    'click #quickbtn': function(e,tpl){
	    	var productId=this._id;
	    	Session.set('quickview',productId);
	    },
	    'click #addtocart':function(e,tpl){
             e.preventDefault();
             var id_product=this._id;
             var qty=tpl.$("#qty").val();
             var shop=tpl.$("#shop").val();
             var attribute=Session.get('selected_attr');

             if(shop==''){
             	alert("Please select a shop!");
             	return;
             }
             if(attribute=='No attribute')
             	attribute='';
			
			if(Meteor.userId()){
				var userId = Meteor.userId();
				Session.setPersistent('userId',userId);
			}
			else{
				if( Session.get('userId') == ""){
					var newId=Random.id();
					Session.setPersistent('userId',newId);
				}
				var userId = Session.get('userId');
			}	
			
			var subtotal = 0;
			
			var sameproduct = cart.findOne({ id_product:id_product, userId:userId, shop:shop})
			if( sameproduct){
				var pro = products.findOne({_id:id_product})
				upqty = parseInt( sameproduct.quantity ) + parseInt(qty);
				if( pro ){
					subtotal = upqty * parseInt(pro.price);
				}
				cart.update(sameproduct._id, {$set: {quantity: upqty, subtotal:subtotal}});
			}else{
				var pro = products.findOne({_id:id_product})
				if( pro ){
					subtotal = parseInt(qty) * parseInt(pro.price);
				}
				var obj={
					id_product:id_product,
					userId:Session.get('userId'),
					quantity:qty,
					subtotal:subtotal,
					shop:shop,
					attribute:attribute,
					order_status:0
				};
			
				cart.insert(obj);
				//Meteor.call('addtocart',obj);
				alert('Product successfully append to cart!'+userId);
			}
			 
            
    	}
 });

Template.listproducts.onCreated(function() {
    
    $(window).on('scroll', function(e) {
    	console.log('scrolling');
       if($(window).scrollTop() == $(document).height() - $(window).height()) {
       		var limit=Number(Session.get('querylimit'));
       		console.log('oldLimit: '+limit);
	    	limit=limit+16;
	    	console.log('NewLimit: '+limit);
	    	Session.set('querylimit',limit);
	    	console.log('limit '+Session.get('querylimit'));
           //alert("Welcome Rosoty");
    	}
    });
});

Template.details.rendered=function(){
	$("[rel='tooltip']").tooltip(); 
};
