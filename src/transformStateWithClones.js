'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = Object.assign({}, state);
  const arrayOfversions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(copyState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      }

      default: {
        throw new Error('Incorrect action type');
      }
    }

    arrayOfversions.push({ ...copyState });
  };

  return arrayOfversions;
}

module.exports = transformStateWithClones;
