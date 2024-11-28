'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const partOfResult = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(partOfResult, act.extraData);
        break;

      case 'removeProperties': {
        for (const key of act.keysToRemove) {
          delete partOfResult[key];
        };
        break;
      }

      case 'clear': {
        for (const key of Object.keys(partOfResult)) {
          delete partOfResult[key];
        };
        break;
      }

      default:
        break;
    }
    result.push({ ...partOfResult });
  }

  return result;
}

module.exports = transformStateWithClones;
