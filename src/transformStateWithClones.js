'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const massive = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        massive.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        massive.push({ ...stateCopy });
        break;

      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }

        massive.push({ ...stateCopy });
        break;
    }
  }

  return massive;
}

module.exports = transformStateWithClones;
