"use strict";function demo1(){console.log(window)}function demo2(){console.log(document)}function checkAdult(o){return o>=18}var ages=[3,10,18,20],demo=function(){console.log("aaa")};demo(),console.log(ages.find(checkAdult)),console.log(666);