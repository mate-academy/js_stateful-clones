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
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        stateCopy[key] = value;
      }
      arrayOfOriginals.push(Object.assign({}, stateCopy));
    }

    if (action.type === 'removeProperties') {
      for (const key in action.keysToRemove) {
        const actionKey = action.keysToRemove[key];

        delete stateCopy[actionKey];
      }
      arrayOfOriginals.push(Object.assign({}, stateCopy));
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      arrayOfOriginals.push(Object.assign({}, stateCopy));
    }
  }

  return arrayOfOriginals;
}

module.exports = transformStateWithClones;
