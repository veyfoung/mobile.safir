/*Meteor.publish('pageproduct', function(limit) {
        return products.find({},{limit:limit});
    });*/
Meteor.publish("categories", function () {console.log('categories:'+categories.find({}).fetch().length);
    return categories.find({});
});
Meteor.publish('products', function (limit){ 
  if(limit!=-1)
    return products.find({},{limit:limit});
  else
    return products.find({});
});
Meteor.publish('images', function (){ 
  return images.find({});
});

Meteor.publish('shops', function (){ 
  return shops.find({})
});
Meteor.publish('parent_tags', function (){ 
  return parent_tags.find({});
});
Meteor.publish('tags', function (){ 
  return tags.find({});
});
Meteor.publish('stats', function (){ 
  return stats.find({});
});

Meteor.publish("attribute", function () {
    return attribute.find({});
 });

Meteor.publish("parentattr", function () {
    return parentattr.find({});
 });

Meteor.publish("users", function () {
    return Meteor.users.find({});
 });
Meteor.publish("cart", function () {
    return cart.find({});
 });
//contents
Meteor.publish("contents", function () {
    return contents.find({});
 });
Meteor.publish("contents_type", function () {
    return contents_type.find({});
 });
// address
Meteor.publish("address", function () {
    return address.find({});
 });
 Meteor.publish("favorite", function () {
    return favorite.find({});
 });
 Meteor.publish("role", function () {
    return Meteor.roles.find({});
 
});
 //Question
 Meteor.publish("question", function () {
    return question.find({});
});

  Meteor.publish("journey", function () {
    return journey.find({});
});

  Meteor.publish("linkselling", function () {
    return linkselling.find({});
});

  Meteor.publish("membershipcard", function () {
    return membershipcard.find({});
});

    Meteor.publish("list_product", function () {
    return list_product.find({});
});

Meteor.publish('attribute_value', function (){ 
  return attribute_value.find({});
});
   Meteor.publish("order", function () {
    return order.find({});
});
