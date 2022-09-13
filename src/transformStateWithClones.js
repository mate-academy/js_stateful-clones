'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const outputArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(copy, action.extraData);
        break;

      case 'clear' :
        for (const key in copy) {
          delete copy[key];
        }
        break;

      case 'removeProperties' :
        for (const keys of action.keysToRemove) {
          delete copy[keys];
        }
        break;
    }
    outputArr.push({ ...copy });
  }

  return outputArr;
}

module.exports = transformStateWithClones;
