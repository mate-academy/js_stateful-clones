'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */


function transformStateWithClones(state, actions) {
  let newState = state;

   for (let object in actions) {
     if (actions[object].type === 'addProperties') {

       newState = Object.assign({}, newState, actions[object].extraData)

       }

     if (actions[object].type === 'removeProperties') {


       for (const key in actions[object].keysToRemove) {
         delete newState[actions[object].keysToRemove[key]];
       }

     }

     if (actions[object].type === 'clear') {
       for (const key in newState) {
         delete newState[key];
       }
     }

   }

   return newState;

 }




module.exports = transformStateWithClones;
