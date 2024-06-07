/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let newObject = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      newObject = { ...newObject, ...extraData };
    }

    if (type === 'removeProperties') {
      for (const item of keysToRemove) {
        delete newObject[item];
      }
    }

    if (type === 'clear') {
      for (const key in newObject) {
        delete newObject[key];
      }
    }

    result.push(newObject);
  }

  return result;
}
module.exports = transformStateWithClones;
