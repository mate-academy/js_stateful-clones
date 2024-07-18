'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {};

  Object.assign(stateCopy, state);

  const modificationsHistory = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case action.type === 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    modificationsHistory.push({ ...stateCopy });
  }

  return modificationsHistory;
}

module.exports = transformStateWithClones;
