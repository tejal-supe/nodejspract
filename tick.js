async function foo(name) {
    console.log(name, "start");
    await console.log(name, "middle");
    console.log(name, "end",);
}

console.log('');
foo("First");
foo("Second");

  for(let i = 0 ; i<10;i++){
    console.log('in');
  }


// setImmediate(()=>{
//  console.log('imme');   
// })
// setTimeout(()=>{
// console.log('timeount');
// },0)

// process.nextTick(()=>{
//     console.log('ticcccccck');
// })

// console.log(process.memoryUsage.rss(),'process')

// Inside a file system or  IO setimmediate is always executed first

// const fs = require("fs");
//  fs.readFile('./data.txt',"utf-8",(data)=>{
//     console.log(data);
//     setImmediate(()=>{
//         console.log('imme');   
//        })
//        setTimeout(()=>{
//        console.log('timeount');
//            },0)
       
//        process.nextTick(()=>{
//            console.log('ticcccccck');
//        })
       
// })
// console.log("");