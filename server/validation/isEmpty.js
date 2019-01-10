// const isEmpty1 = val => {

//   // String, object, null, undefined is true 
//   // other then that false 

//   if(val === "" || val === " "){
//     return true
//   }else if(val === undefined ){
//     return true
//   }else if(val === null){
//     return true
//   }else if (Object.keys(val).length === 0){
//     return true }

//   return false;
// }

module.exports.isEmpty = function(val){
  return  (typeof val === 'string' && val.trim().length === 0) || val === undefined || val === null || Object.keys(val).length === 0;
}
