'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const tempState = { ...state };

  for (const act in actions) {
    switch (actions[act].type) {
      case 'addProperties':
        Object.assign(tempState, actions[act].extraData);
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[act].keysToRemove.length; j++) {
          delete tempState[actions[act].keysToRemove[j]];
        }
        break;

      case 'clear':
        for (const prop in tempState) {
          delete tempState[prop];
        }
        break;
    }

    result.push({ ...tempState });
  }

  return result;
}

module.exports = transformStateWithClones;
