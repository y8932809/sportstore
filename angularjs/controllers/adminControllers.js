angular.module("sportsStoreAdmin")
.constant("authUrl","http://localhost:5500/users/login")
    .constant("orderUrl","http://localhost:5500/orders")
.controller("authCtrl", function ($scope,$http,$location,authUrl) {
        $scope.authenticate= function (user,pass) {
            $http.post(authUrl,{

                username:user,
                password:pass
            },{withCredentials:true})
                .success(function (data) {
                    $location.path("/main");
                })
                .error(function(error){
                    $scope.authenticationError=error;
                });
        }

    })
.controller("mainCtrl", function ($scope) {
        $scope.screens=["products","orders"];
        $scope.current=$scope.screens[0];
        $scope.setScreen= function (index) {
             $scope.current=$scope.screens[index];
        }
        $scope.getScreen= function () {
            return $scope.current=="products"?"views/adminProducts.html":"views/adminOrders.html";
        };
    })
.controller("ordersCtrl", function ($scope,$http,orderUrl) {
        $http.get(orderUrl,{withGredentials:true})
            .success(function (data) {
                $scope.orders=data;
            })
            .error(function (error) {
                $scope.error=error;
            });
        $scope.selectedOrder;
        $scope.selectOrder= function (order) {
            $scope.selectedOrder=order;
        };
        $scope.calcTotal=function(order){
            var total=0;
            for(var i=0;i<order.products.length;i++){
                total+=order.products[i].count*order.products[i].price
;            }
            return total;
        }

    })

//if(me==undefind||me.username!="admin"){
//    cancel("no authorization",401)
//}