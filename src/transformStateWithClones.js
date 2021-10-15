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
        result.push({});
        stateCopy = {};
        continue;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        result.push({ ...stateCopy });
        continue;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        result.push({ ...stateCopy });
        continue;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
