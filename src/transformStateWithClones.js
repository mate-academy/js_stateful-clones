'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(keyRemove)) {
            delete stateCopy[keyRemove];
          }
        }

        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
