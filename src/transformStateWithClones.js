'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/**
 * @param {Object} state
 * @param {Object[]} actions
 */
function transformStateWithClones(state, actions) {
  const history = [];

  actions.forEach((action, index) => {
    let newState = index === 0 ? { ...state } : { ...history[index - 1] };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          action.keysToRemove.forEach((key) => delete newState[key]);
        }
        break;
    }
    history.push({ ...newState });
  });

  return history;
}

module.exports = transformStateWithClones;
