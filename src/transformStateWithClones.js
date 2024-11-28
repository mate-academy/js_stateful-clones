'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const statesHistory = [];
  const clear = 'clear';
  const addProp = 'addProperties';
  const removeProp = 'removeProperties';

  actions.forEach((action) => {
    switch (action.type) {
      case clear:
        currentState = {};
        break;
      case addProp:
        currentState = { ...currentState, ...action.extraData };
        break;
      case removeProp:
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
    }
    statesHistory.push({ ...currentState });
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
