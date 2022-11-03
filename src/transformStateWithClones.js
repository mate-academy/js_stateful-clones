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
    switch (actions[key].type) {
      case 'addProperties':
        Object.assign(stateB, actions[key].extraData);
        break;
      case 'removeProperties':
        const keysToRemove = actions[key].keysToRemove;

        for (const each in keysToRemove) {
          delete stateB[keysToRemove[each]];
        }
        break;
      case 'clear':
        stateB = {};
        break;
    }
    secondState.push({ ...stateB });
  };

  return secondState;
}

module.exports = transformStateWithClones;
