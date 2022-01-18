'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = [];

  const currentState = {
    ...state,
  };

  actions.forEach((action, index) => {
    const type = action.type;

    if (type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete currentState[key]);
    } else if (type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    clone.push({
      ...currentState,
    });
  });

  return clone;
}

module.exports = transformStateWithClones;
