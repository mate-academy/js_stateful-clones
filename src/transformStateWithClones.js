'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  actions.forEach((actionObj) => {
    switch (actionObj.type) {
      case 'addProperties':
        Object.assign(currentState, { ...actionObj.extraData });
        break;
      case 'removeProperties':
        actionObj.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }

    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
