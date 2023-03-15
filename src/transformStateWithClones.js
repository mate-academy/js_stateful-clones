'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = JSON.parse(JSON.stringify(state));
  const clonArr = [];

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(cloneState, action.extraData);
        break;

      case ('clear'):
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      case ('removeProperties'):
        for (const keyToRemove of action.keysToRemove) {
          delete cloneState[keyToRemove];
        }
        break;

      default:
        return cloneState;
    }
    clonArr.push({ ...cloneState });
  }

  return clonArr;
}

module.exports = transformStateWithClones;
