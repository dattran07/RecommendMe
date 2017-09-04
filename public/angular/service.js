angular.module("myApp").service("service", function($http) {

    this.getData = function() {
        return $http({
            method: "GET",
            url: '/api/products'
        }).then(function(response) {
            return response.data;
        })
    }
    this.updateData = function(id,desc,price) {
        return $http({
            method: "PUT",
            url: '/api/product/' + id + "/" + price + "?desc=" + desc,
        })
    }
    this.deleteData = function(id) {
        return $http({
            method: "DELETE",
            url: '/api/product/' + id
        })
    }
    this.addData = function(name,desc,price,img,url) {
      console.log(name,desc,price,img,url)
        return $http({
            method: "POST",
            url: `/api/product?name=${name}&description=${desc}&price=${price}&imageurl=${img}&producturl=${url}`,
            data: {"name" : name, "description" : desc, "price" : price, "imageurl" : img, "producturl" : url}
        })
    }
    this.SendingMail = (contact) => {
      return $http({
        method: "POST",
        url: '/api/email?msg=' + contact.msg + '&email=' + contact.email + '&name=' + contact.name
      })
    }
})
