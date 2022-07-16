'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const myStatesArray = [];
  let tempState = {};
  const myCurrentState = {};

  for (const keyInState in state) {
    myCurrentState[keyInState] = state[keyInState];
  }

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :

        for (const key in action.extraData) {
          myCurrentState[key] = action.extraData[key];
        }
        tempState = {};

        for (const keyInMyState in myCurrentState) {
          tempState[keyInMyState] = myCurrentState[keyInMyState];
        }
        myStatesArray.push(tempState);
        break;

      case 'clear':

        for (const keyState in myCurrentState) {
          delete myCurrentState[keyState];
        }
        tempState = {};

        for (const keyInMyState in myCurrentState) {
          tempState[keyInMyState] = myCurrentState[keyInMyState];
        }
        myStatesArray.push(tempState);
        break;

      case 'removeProperties':
        const keysArr = action.keysToRemove;

        for (const keyRemove of keysArr) {
          delete myCurrentState[keyRemove];
        }
        tempState = {};

        for (const keyInMyState in myCurrentState) {
          tempState[keyInMyState] = myCurrentState[keyInMyState];
        }
        myStatesArray.push(tempState);
        break;
    }
  }

  return myStatesArray;
}

module.exports = transformStateWithClones;
