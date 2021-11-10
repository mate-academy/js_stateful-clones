'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const arrReturn = [];

  for (const obj of actions) {
    if (obj.type === 'clear') {
      for (const keyInNewState in newState) {
        delete newState[keyInNewState];
      }
    }

    if (obj.type === 'removeProperties') {
      for (const keyInState in newState) {
        if (obj.keysToRemove.includes(keyInState)) {
          delete newState[keyInState];
        }
      }
    }

    if (obj.type === 'addProperties') {
      Object.assign(newState, obj.extraData);
    }

    arrReturn.push({
      ...newState,
    });
  }

  return arrReturn;
}

module.exports = transformStateWithClones;
