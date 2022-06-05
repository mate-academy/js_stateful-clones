'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = {
    ...state,
  };
  const arrayOfClones = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          if (newState[keyToRemove]) {
            delete newState[keyToRemove];
          }
        }
        break;
      case 'clear':
        newState = {};
        break;
    }
    arrayOfClones.push({ ...newState });
  }

  return arrayOfClones;
}

module.exports = transformStateWithClones;
