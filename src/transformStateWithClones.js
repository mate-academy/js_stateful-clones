'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties' :
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties' :
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear' :
        for (const i in cloneState) {
          delete cloneState[i];
        }
        break;

      default :
        return [];
    }

    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
