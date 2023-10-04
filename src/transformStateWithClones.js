'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = Object.assign({}, state);
  const arrayOfOriginals = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          stateCopy[key] = value;
        };
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          const actionKey = action.keysToRemove[key];

          delete stateCopy[actionKey];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
    }
    arrayOfOriginals.push(Object.assign({}, stateCopy));
  }

  return arrayOfOriginals;
}

module.exports = transformStateWithClones;
