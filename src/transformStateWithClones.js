'use strict';

function transformStateWithClones(state, actions) {

let arr = []
let suporte = {}

for(let i = 0; i < actions.length; i++){
    
  if (actions[i].type === 'addProperties') {
   Object.assign(suporte,state, actions[i].extraData,)
   arr[i] = suporte
  }
  else if(actions[i].type === 'removeProperties'){
    i === 0 ? arr[0] = state : arr[i] = arr[i-1]

   for(let o = 0; o < actions[o].keysToRemove.length; o++){ 
    
    const key = Object.keys(arr[i])
    console.log("quero apagar" + " ['foo', 'bar']")
    console.log("arr por enquanto")
    console.log(arr[i])
  
    if (actions[o].keysToRemove.includes(arr[o][key[o]])){
    
       delete arr[i][key[o]]
       console.log(arr)    
    }
   }
  }
  else if (actions[i].type === "clear") {
    arr[i] = {}
    console.log(arr)
   }
}

}
module.exports = transformStateWithClones; 

