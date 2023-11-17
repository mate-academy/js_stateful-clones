'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }

        break;
      }

      case 'clear': {
        for (const key of Object.keys(state)) {
          delete stateCopy[key];
        }

        break;
      }
    }

    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
