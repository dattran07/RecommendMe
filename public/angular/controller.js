angular.module("myApp").controller('controller', function(service, $scope) {

  $scope.data = function() {
    service.getData().then(function(response) {
      $scope.product = response;
      $scope.products = $scope.product.sort((a,b)=>{return a.productid - b.productid})

    });
  }
  $scope.data();
  $scope.update = function(id, desc, price) {
    service.updateData(id, desc, price)
    $scope.data();
  }
  $scope.delete = function(id) {
    service.deleteData(id)
    $scope.data();
  }
  $scope.add = function(name, desc, price, img, url) {
    service.addData(name, desc, price, img, url).then(res => console.log(res))
    $scope.data();
  }
})
