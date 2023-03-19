'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties' :
        action.keysToRemove.forEach(property => {
          delete clone[property];
        });
        break;

      case 'clear':
        Object.keys(clone).forEach(key => {
          delete clone[key];
        });
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
