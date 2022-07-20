'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const arrayState = [];

  for (const property of actions) {
    switch (property.type) {
      case 'addProperties':

        cloneState = { ...cloneState };

        for (const key in property.extraData) {
          cloneState[key] = property.extraData[key];
        }
        break;

      case 'removeProperties':

        cloneState = { ...cloneState };

        for (const keyRemove of property.keysToRemove) {
          if (keyRemove in cloneState) {
            delete cloneState[keyRemove];
          }
        }
        break;

      case 'clear':
        cloneState = {};
        break;

      default:
        continue;
    }
    arrayState.push(cloneState);
  }

  return arrayState;
}

module.exports = transformStateWithClones;
