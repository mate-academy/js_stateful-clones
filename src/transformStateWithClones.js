'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateChanges = [];

  stateChanges.push({ ...state });

  for (const action of actions) {
    const obj = { ...stateChanges[stateChanges.length - 1] };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          obj[key] = action.extraData[key];
        }
        stateChanges.push(obj);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete obj[keyToRemove];
        }
        stateChanges.push(obj);
        break;
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        stateChanges.push(obj);
        break;
      default:
        break;
    }
  }

  stateChanges.shift();

  return stateChanges;
}

module.exports = transformStateWithClones;
