'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const objs = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(objs, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete objs[key];
      }
    } else if (action.type === 'clear') {
      for (const key in objs) {
        delete objs[key];
      }
    }
    result.push({ ...objs });
  }

  return result;
}

module.exports = transformStateWithClones;
