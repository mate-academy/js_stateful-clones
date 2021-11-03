'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const preResult = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(preResult, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete preResult[key];
        }
        break;

      case 'clear':
        for (const key in preResult) {
          delete preResult[key];
        }
        break;
    }
    result.push({ ...preResult });
  }

  return result;
}

module.exports = transformStateWithClones;
