'use strict';

// /**
//  * @param {Object} state
//  * @param {Object[]} actions
//  *
//  * @return {Object[]}
//  */

function transformStateWithClones(state, actions) {
  const newState = [];
  let cloneState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneState[key];
        }

        break;

      case 'clear':
        cloneState = {};
        break;
    }

    newState.push({ ...cloneState });
  }

  return newState;
}
module.exports = transformStateWithClones;
