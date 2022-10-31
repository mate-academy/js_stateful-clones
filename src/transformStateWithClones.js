'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const secondState = [];
  let stateB = { ...state };

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(stateB, actions[key].extraData);
    } else if (actions[key].type === 'removeProperties') {
      const keysToRemove = actions[key].keysToRemove;

      for (const each in keysToRemove) {
        delete stateB[keysToRemove[each]];
      }
    } else if (actions[key].type === 'clear') {
      stateB = {};
    }
    secondState.push({ ...stateB });
  };

  return secondState;
}

module.exports = transformStateWithClones;
