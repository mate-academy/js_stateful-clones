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

  for (const action of actions) {
    if (action === 'addProperties') {
      result.push(Object.assign({}, state, action.extraData));
    } else if (action === 'removeProperties') {
      const clone = { ...state };

      result.push(clone);

      for (const key of action.keysToRemove) {
        delete clone[key];
      }
    } else {
      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
