'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let myState = { ...state };
  const arr = [];

  for (const item of actions) {
    myState = { ...myState };
    arr.push(myState);

    if (item.type === 'addProperties') {
      myState = (Object.assign(myState, item.extraData));
    }

    if (item.type === 'removeProperties') {
      for (const key of item.keysToRemove) {
        delete myState[key];
      }
    }

    if (item.type === 'clear') {
      for (const key in myState) {
        if (myState.hasOwnProperty(key)) {
          delete myState[key];
        }
      }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
