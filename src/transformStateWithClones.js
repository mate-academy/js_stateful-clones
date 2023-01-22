'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        Object.getOwnPropertyNames(copyState).forEach(function(prop) {
          delete copyState[prop];
        });
        break;
    }
    resultArray.push({ ...copyState });
  }

  return resultArray;
}
module.exports = transformStateWithClones;
