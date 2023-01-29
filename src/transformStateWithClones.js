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
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete stateCopy[prop];
        }
        break;

      case 'clear':
        stateCopy = {};
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
