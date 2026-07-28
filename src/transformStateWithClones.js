'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = state;

  for (const obj of actions) {
    const newObj = Object.assign({}, currentState);
    const action = obj.type;
    const plus = obj.extraData;
    const minus = obj.keysToRemove;

    if (action === 'addProperties') {
      Object.assign(newObj, plus);
      result.push(newObj);
      currentState = newObj;
    } else if (action === 'removeProperties') {
      for (const key of minus) {
        delete newObj[key];
      }
      result.push(newObj);
      currentState = newObj;
    } else if (action === 'clear') {
      for (const key1 in newObj) {
        delete newObj[key1];
      }
      result.push(newObj);
      currentState = newObj;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
