angular.module("musicApp.directives").directive("touch2Scroll",["$timeout",function(o){function e(o,e){function l(){o.draggable&&(f.scrollTop(s-r),f.scrollLeft(a-u))}function t(){s=f.scrollTop(),a=f.scrollLeft()}var c=0,n=0,u=0,r=0,i=!1,s=0,a=0,f=$(e).find(".draggable");o.mouseDown=function(o){i=!0,t(),c=o.x,n=o.y,u=0,r=0},o.mouseMove=function(o){i&&(u=o.x-c,r=o.y-n,l())},o.mouseUp=function(o){i=!1,c=0,n=0,u=0,r=0},o.mouseLeave=function(e){o.mouseUp(e)}}return{templateUrl:"templates/touch2Scroll.html",scope:{cstyle:"=",draggable:"="},transclude:!0,link:e}}]);