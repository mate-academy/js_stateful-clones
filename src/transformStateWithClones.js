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

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties' :
        Object.assign(intermediateState, object.extraData);
        break;

      case 'removeProperties' :
        for (const key of object.keysToRemove) {
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
