
angular.module('musicApp.directives')
.directive('adjustImage', ['$timeout', function($timeout){
    function link($scope, $element){
        $scope.pf = parseFloat;
        if (!!$scope.imageProperties){
            $scope.image2Draw = $scope.imageProperties;
            $scope.isDefaultImage = false;
        } else {
            $scope.isDefaultImage = true;
            $scope.image2Draw = $scope.defaultImage;
        }


        function adjustImage(width, height){
            $scope.isWiderImage = parseFloat($scope.image2Draw.width)/parseFloat($scope.image2Draw.height) > width/height;
            $scope.isHigherImage = (parseFloat($scope.image2Draw.width)/parseFloat($scope.image2Draw.height) < width/height);
            $scope.sameRatioImage = (!$scope.isWiderImage) && (!$scope.isHigherImage);

            if ($scope.isWiderImage){
                $scope.marginLeft = ((width-parseFloat($scope.image2Draw.width)*height/parseFloat($scope.image2Draw.height))/2) + 'px';
                $scope.marginTop = 0;
            } else if ($scope.isHigherImage) {
                $scope.marginLeft = 0;
                $scope.marginTop = 0;
                // $scope.marginTop = (2/5)*((height-parseFloat($scope.image2Draw.height)*width/parseFloat($scope.image2Draw.width))/2) + 'px';
            } else {
                $scope.marginLeft = 0;
                $scope.marginTop = 0;
            }
        }

        $timeout(function(){
            var jqElement = $($element).find('.adjustImage');
            adjustImage(jqElement[0].offsetWidth, jqElement[0].offsetHeight);
        });
    }
    return {
        scope: {
            imageProperties: '=',
            defaultImage: '=',
            draggable: '=?'
        },
        link: link,
        templateUrl: 'templates/imageAdjust.html'
    }
}])
;
