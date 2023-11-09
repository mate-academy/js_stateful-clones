'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clon = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clon, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clon[key];
        }
        break;

      case 'clear':
        clon = {};
        break;

      default:
        break;
    }
    result.push({ ...clon });
  }

  return result;
}

module.exports = transformStateWithClones;
