'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = Object.assign({}, state);
  const result = [];

  for (let prop = 0; prop < actions.length; prop++) {
    if (actions[prop].type === 'addProperties') {
      Object.assign(newObj, actions[prop].extraData);
      result.push({ ...newObj });
    } else if (actions[prop].type === 'removeProperties') {
      for (const key of actions[prop].keysToRemove) {
        delete newObj[key];
      }
      result.push({ ...newObj });
    } else if ((actions[prop].type === 'clear')) {
      for (const key in newObj) {
        delete newObj[key];
      }
      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
