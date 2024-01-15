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
      case 'addProperties':
        stateCopy = Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;
