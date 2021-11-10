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
      for (const keyToRemove of obj.keysToRemove) {
        for (const keyInNewState in newState) {
          if (keyInNewState === keyToRemove) {
            delete newState[keyInNewState];
          }
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
