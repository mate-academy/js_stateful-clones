'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear' :
        cloneState = {};
        break;
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
