'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const chainActions = [];
  let keys = [];
  let values = [];
  
  for(const action of actions) {
    
    switch(action.type) {
      
          case 'addProperties':
              
              let objectActionAdd = {};
              chainActions.length === 0 ? objectActionAdd = {...state} : objectActionAdd = {...chainActions[chainActions.length-1]}
              
              keys = Object.keys(action.extraData);
              values = Object.values(action.extraData);
              
              for(let i = 0; i < keys.length; i++) {
                
                objectActionAdd[keys[i]] = values[i]
                
              }
              
              chainActions.push(objectActionAdd);
              break;
        
        case 'removeProperties':

              let objectActionRemove = {};
              chainActions.length === 0 ? objectActionRemove = {...state} : objectActionRemove = {...chainActions[chainActions.length-1]};              
              keys = [...action.keysToRemove];
              
              for(let i = 0; i < keys.length; i++) {
                
                delete objectActionRemove[keys[i]];
                
              }
              
              chainActions.push(objectActionRemove);
              break;
              
        case 'clear':
              
              chainActions.push({});
              break;
              
      
    }
    
  }
  
  return chainActions;
}

module.exports = transformStateWithClones;
