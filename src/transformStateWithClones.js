'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateTransformed = [];
  const stateModified = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateModified, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          if (stateModified[keys]) {
            delete stateModified[keys];
          }
        }
        break;

      case 'clear':
        for (const keys in stateModified) {
          delete stateModified[keys];
        }
        break;

      default:
        throw new Error();
    }

    stateTransformed.push({ ...stateModified });
  }

  return stateTransformed;
}

module.exports = transformStateWithClones;
