/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const table = {
    ...state,
  };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const delet in table) {
        delete table[delet];
      }
      console.log(table);
    } else if (action.type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete table[remove];
      }
    } else {
      Object.assign(table, action.extraData);
    }

    result.push({ ...table });
  }

  return result;
}

module.exports = transformStateWithClones;
