'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let cloneState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        cloneState = Object.assign({}, cloneState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let a = 0; a < actions[i].keysToRemove.length; a++) {
          delete cloneState[actions[i].keysToRemove[a]];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        break;
    }

    resultStates.push(cloneState);
    cloneState = Object.assign({}, resultStates[i]);
  }

  return resultStates;
}

module.exports = transformStateWithClones;
