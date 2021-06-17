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

    switch (action.type) {
      case 'addProperties':
        myState = (Object.assign(myState, action.extraData));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete myState[key];
        }
        break;
      case 'clear':
        for (const key in myState) {
          if (myState.hasOwnProperty(key)) {
            delete myState[key];
          }
        }
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
