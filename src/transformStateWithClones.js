'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArr = [];
  const cloneState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const keys in cloneState) {
          delete cloneState[keys];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;
    }
    finalArr.push({ ...cloneState });
  }

  return finalArr;
}
module.exports = transformStateWithClones;
