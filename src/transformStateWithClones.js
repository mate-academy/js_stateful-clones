'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  let copyState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = Object.assign({}, copyState, act.extraData);
        break;

      case 'removeProperties':
        copyState = Object.assign({}, copyState);

        for (const key of act.keysToRemove) {
          delete copyState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: '${act.type}'`);
    }

    allStates.push({ ...copyState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
