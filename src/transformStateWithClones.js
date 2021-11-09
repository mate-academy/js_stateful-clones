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

  for (const i of actions) {
    if (i.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    if (i.type === 'removeProperties') {
      for (const rem of i.keysToRemove) {
        for (const key in newState) {
          if (key === rem) {
            delete newState[key];
          }
        }
      }
    }

    if (i.type === 'addProperties') {
      Object.assign(newState, i.extraData);
    }

    arrReturn.push({
      ...newState,
    });
  }

  return arrReturn;
}

module.exports = transformStateWithClones;
