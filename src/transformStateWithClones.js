'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = Object.assign({}, state);
  const tempState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        clone = {
          ...clone,
          ...action.extraData,
        };

        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete clone[key];
        }

        break;
      }

      case 'clear': {
        for (const key in clone) {
          delete clone[key];
        }

        break;
      }
    }

    tempState.push({ ...clone });
  }

  return tempState;
}

module.exports = transformStateWithClones;
