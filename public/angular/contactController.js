angular.module('myApp').controller('contactCtrl', function($scope, service) {
  $scope.sendMail = (contact) => {
    service.SendingMail(contact)
  }
})
