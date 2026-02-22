'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const copyState = { ...state };

  for (let index = 0; index < actions.length; index++) {
    let nexState = {};

    switch (actions[index].type) {
      case 'addProperties':
        nexState = { ...Object.assign(copyState, actions[index].extraData) };
        break;

      case 'removeProperties':
        for (let num = 0; num < actions[index].keysToRemove.length; num++) {
          delete copyState[actions[index].keysToRemove[num]];
        }
        nexState = { ...copyState };
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        nexState = { ...copyState };
        break;

      default:
        nexState = { ...copyState };
    }

    history.push(nexState);
  }

  return history;
}

module.exports = transformStateWithClones;
