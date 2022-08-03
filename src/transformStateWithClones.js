'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyObject = Object.assign({}, state);
  const clone = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(copyObject, obj.extraData);
      clone.push(Object.assign({}, copyObject));
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete copyObject[key];
      }
      clone.push(Object.assign({}, copyObject));
    }

    if (obj.type === 'clear') {
      for (const key in copyObject) {
        delete copyObject[key];
      }
      clone.push({});
    }
  }

  return clone;
}

module.exports = transformStateWithClones;
