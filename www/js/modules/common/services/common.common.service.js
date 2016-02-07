define(function () {
    "use strict";

    var factory = function ($http, $q, CONFIG, appStore, $ionicLoading) {
        
        function getMenu() {
            var def = $q.defer();
            $http.get(CONFIG.SERVICE_URL.MENU).success(function(data) {
                def.resolve(data || []);
            }).error(function(err) {
                console.log("some error occurred in menu json loading"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        function addToFavorite(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            var $ele = $(evt.currentTarget), savedUser = appStore.getFromLocal("userLoggedInStatus");
            var recipeId = $ele.parents(".item-container").attr("id");

            if($ele.hasClass("favorite-item")) {
                if(savedUser) {
                    __removeFromFavorites(recipeId, savedUser.userID).then(function(data) {
                        $ele.removeClass("favorite-item");
                        appStore.removeFromLocal("savedRecipes.savedItems_"+recipeId);
                    });
                } else {
                    $ele.removeClass("favorite-item");
                    appStore.removeFromLocal("savedRecipes.savedItems_"+recipeId);
                }
            } else {
                if(savedUser) {
                    __getFullRecipe(recipeId, savedUser.userID).then(function(data) {
                        $ele.addClass("favorite-item");
                        appStore.storeInLocal("savedRecipes.savedItems_"+recipeId, data);
                    });
                } else {
                    $ele.addClass("favorite-item");
                    appStore.storeInLocal("savedRecipes.savedItems_"+recipeId, data);
                }
            }
        }

        function __removeFromFavorites(recipeId, userID) {
            var def = $q.defer();

            $ionicLoading.show();
            $http.get(CONFIG.SERVICE_URL.REMOVE_FAVORITE_RECIPE+"/"+userID+"/"+recipeId).success(function(data){
                $ionicLoading.hide();
                def.resolve(data);
            }).error(function() {
                $ionicLoading.hide();
                console.log("error in removing recipe from favorites");
                def.reject([]);
            });

            return def.promise;
        }

        function __getFullRecipe(recipeId, userID) {
            var def = $q.defer();

            $ionicLoading.show();
            $http.get(CONFIG.SERVICE_URL.SET_FAVORITE_RECIPE+"/"+userID+"/"+recipeId).success(function(data){
                $ionicLoading.hide();
                def.resolve(data);
            }).error(function() {
                $ionicLoading.hide();
                console.log("error in setting recipe as favorites");
                def.reject([]);
            });

            return def.promise;
        }
        
        return {
            getMenu: getMenu,
            addToFavorite: addToFavorite
        };

    };

    factory.$inject = ['$http', '$q', 'CONFIG', 'appStore', '$ionicLoading'];
    return factory;
});