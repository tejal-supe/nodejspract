// import { add } from "./createModule.js";
// console.log(this==module.exports);
// console.log(globalThis);
const cal = require("./createModule")
// console.log(this==global);

// console.log(cal.add(3,5),cal.foo);
function fn(){
    console.log(this);
}
fn();

const obj = {
    b:"hi",
    a:function(){
            console.log(this);
    }
}
obj.a()
const obj2 = {
    d:"hehiuhd",
    f:()=>{
        console.log(this);
    }
}

const arr = () =>{
    console.log(this);
}
arr()
obj2.f()

const obj3 = {
    d:"hehiuhd",
    f:function(){
       const r = ()=>{
            console.log(this);
        }
        r()
    }
}
obj3.f()
