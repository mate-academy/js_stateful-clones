'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const transformedClones = [];
  let currentState = { ...state };

  for (const action of actions) {
    const clone = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          clone[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          for (const data in clone) {
            if (data === key) {
              delete clone[data];
            }
          }
        }
        break;

      case 'clear':
        for (const data in clone) {
          delete clone[data];
        }
        break;

      default:
        break;
    }

    transformedClones.push(clone);
    currentState = clone;
  }

  return transformedClones;
}

module.exports = transformStateWithClones;
