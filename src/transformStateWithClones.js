'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clon;

  for (const action of actions) {
    if (result.length === 0) {
      clon = { ...state };
    } else {
      clon = { ...result[result.length - 1] };
    }

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
    result.push(clon);
  }

  return result;
}

module.exports = transformStateWithClones;
