'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massive = [];
  const result = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in result) {
        delete result[key];
      };
      massive.push({ ...result });
      continue;
    }

    if (action.type === 'removeProperties') {
      for (const i of action.keysToRemove) {
        delete result[i];
      };
      massive.push({ ...result });
      continue;
    }

    if (action.type === 'addProperties') {
      Object.assign(result, action.extraData);
      massive.push({ ...result });
    }
  }

  return massive;
}

module.exports = transformStateWithClones;
