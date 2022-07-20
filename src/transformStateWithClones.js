'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function copyFunction(myCurrentState) {
  const tempState = {};

  Object.assign(tempState, myCurrentState);

  return tempState;
}

function transformStateWithClones(state, actions) {
  // write code here
  const myStatesArray = [];
  let tempState = {};
  const myCurrentState = {};

  Object.assign(myCurrentState, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :

        Object.assign(myCurrentState, action.extraData);
        tempState = copyFunction(myCurrentState);

        break;

      case 'clear':

        for (const keyState in myCurrentState) {
          delete myCurrentState[keyState];
        }
        tempState = {};

        break;

      case 'removeProperties':

        const keysArr = action.keysToRemove;

        for (const keyRemove of keysArr) {
          delete myCurrentState[keyRemove];
        }
        tempState = copyFunction(myCurrentState);

        break;

      default : break;
    }
    myStatesArray.push(tempState);
  }

  return myStatesArray;
}

module.exports = transformStateWithClones;
