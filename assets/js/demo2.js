/**
 * Created by zengwei on 2017/9/18
 */

function demo2(){
    console.log(document)
}

var ages = [3, 10, 18, 20];

function checkAdult(age) {
    return age >= 18;
}

var demo = () => {
    console.log('saaa')
}

demo()

console.log(ages.find(checkAdult))
console.log(666)