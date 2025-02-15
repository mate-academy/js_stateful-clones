'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformResult = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        const keys = Object.keys(stateCopy);

        for (const key of keys) {
          delete stateCopy[key];
        }
        break;
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
    }

    transformResult.push({ ...stateCopy });
  }

  return transformResult;
}
module.exports = transformStateWithClones;
