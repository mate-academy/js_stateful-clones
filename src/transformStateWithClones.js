'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const intermediateState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(intermediateState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete intermediateState[key];
        }
        break;

      case 'clear' :
        for (const key in intermediateState) {
          delete intermediateState[key];
        }
        break;
    }

    result.push({ ...intermediateState });
  }

  return result;
}

module.exports = transformStateWithClones;
