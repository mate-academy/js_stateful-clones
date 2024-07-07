/* eslint-disable prettier/prettier */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      result.push({ ...clone });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }

      result.push({ ...clone });
    } else {
      for (const key in clone) {
        delete clone[key];
      }
      result.push({ ...clone });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
