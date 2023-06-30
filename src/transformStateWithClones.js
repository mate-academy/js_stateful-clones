'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(proper => {
          delete copyState[proper];
        });
        break;
      case 'clear':
        copyState = {};
        break;
      default:
        return (`Unknown action type: ${action.type}`);
    }
    stateClones.push({ ...copyState});
  };

  return stateClones;
}

module.exports = transformStateWithClones;
