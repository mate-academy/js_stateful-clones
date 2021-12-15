'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          if (stateClone.hasOwnProperty([key])) {
            delete stateClone[key];
          }
        }
        break;

      case 'clear' :
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default :
        return 'error!';
    }
    history.push({ ...stateClone });
  }

  return history;
}

module.exports = transformStateWithClones;
