'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const result = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const m of action.keysToRemove) {
          delete stateCopy[m];
        }
        break;

      case 'clear':
        for (const n in stateCopy) {
          delete stateCopy[n];
        }
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
