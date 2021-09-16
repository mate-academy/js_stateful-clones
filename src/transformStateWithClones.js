'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = state;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const newObj = Object.assign({}, obj, action.extraData);

      result.push(newObj);
      obj = newObj;
    }

    if (action.type === 'removeProperties') {
      const cleanObj = Object.assign({}, obj);

      for (const key of action.keysToRemove) {
        delete cleanObj[key];
      }
      result.push(cleanObj);
      obj = cleanObj;
    }

    if (action.type === 'clear') {
      result.push({});
      obj = {};
    }
  }

  return result;
}

module.exports = transformStateWithClones;
