// create a module in es 

// export const add=(a,b)=>{
// return a+b;
// }

exports.add = (a,b)=>{
return a+b
}
exports.sub=function(a,b){
    return a-b
}

module.exports.foo =5
// console.log(this,'in modu');