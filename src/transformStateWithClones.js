'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let transClone = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete transClone[key];
      }
    } else if (action.type === 'addProperties') {
      transClone = { ...transClone, ...action.extraData };
    } else if (action.type === 'clear') {
      transClone = {};
    }

    result.push(structuredClone(transClone));
  }

  return result;
}

module.exports = transformStateWithClones;
