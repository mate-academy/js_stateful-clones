'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const lastState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(lastState, action.extraData);
        history.push({ ...lastState });
        break;

      case 'removeProperties' :
        action.keysToRemove.forEach(key => {
          delete lastState[key];
        });
        history.push({ ...lastState });
        break;

      case 'clear' :
        Object.keys(lastState).forEach(key => {
          delete lastState[key];
        });
        history.push({ ...lastState });
        break;

      default :
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
