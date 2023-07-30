'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesOfState = [];
  const transformedState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(transformedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete transformedState[key];
        }
        break;

      case 'clear':
        for (const key in transformedState) {
          delete transformedState[key];
        }
        break;
        
      default:
        return 'Unknown action type'
    }
    clonesOfState.push({ ...transformedState });
  });

  return clonesOfState;
}

module.exports = transformStateWithClones;
