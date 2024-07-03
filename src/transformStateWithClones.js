'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const x = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const key in obj.extraData) {
          x[key] = obj.extraData[key];
        }
        result.push({ ...x });
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete x[key];
        }
        result.push({ ...x });
        break;

      case 'clear':
        for (const key in x) {
          delete x[key];
        }
        result.push({ ...x });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
