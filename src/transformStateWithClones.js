'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let myState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    myState = { ...myState };
    resultArray.push(myState);

    if (action.type === 'addProperties') {
      myState = (Object.assign(myState, action.extraData));
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete myState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in myState) {
        if (myState.hasOwnProperty(key)) {
          delete myState[key];
        }
      }
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
