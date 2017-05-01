

angular.module('musicApp.directives')

.directive('touch2Scroll', ['$timeout', function($timeout){
    function link($scope, $element){
        var x = 0;
        var y = 0;
        var diffX = 0;
        var diffY = 0;
        var dragging = false;
        var topPos = 0;
        var leftPos = 0;
        var jqElement = $($element).find('.draggable');

        function scroll(){
            if ($scope.draggable){
                jqElement.scrollTop(topPos - diffY);
                jqElement.scrollLeft(leftPos - diffX);
            }
        }
        function startScroll(){
            topPos = jqElement.scrollTop();
            leftPos = jqElement.scrollLeft();
        }

        $scope.mouseDown = function(event){
            dragging = true;
            startScroll();
            x = event.x;
            y = event.y;
            diffX = 0;
            diffY = 0;
        };
        $scope.mouseMove = function(event){
            if (dragging){
                diffX = event.x - x;
                diffY = event.y - y;
                scroll();
            }
        };
        $scope.mouseUp = function(event){
            dragging = false;
            x = 0;
            y = 0;
            diffX = 0;
            diffY = 0;
        };
        $scope.mouseLeave = function(event){
            $scope.mouseUp(event);
        };
    }
    return {
        templateUrl: 'templates/touch2Scroll.html',
        scope: {
            cstyle: '=',
            draggable: '='
        },
        transclude: true,
        link: link
    }
}])
;
