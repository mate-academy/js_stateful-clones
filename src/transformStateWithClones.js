'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const newState = { ...state };

  for (const act of actions) {
    const { type, extraData, keysToRemove } = act;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    const obj = { ...newState };

    arr.push(obj);
  }

  return arr;
}

module.exports = transformStateWithClones;
