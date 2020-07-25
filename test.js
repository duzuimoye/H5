let arr = [1,2,3]
let result = arr.forEach((item) =>{
  if(item > 1) {
    console.log(item)
  } else{
    return false
  }
}) 
console.log(result)