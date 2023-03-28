'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = Object.assign({}, state);
  const statesOfSteps = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (stateClone[key]) {
            delete stateClone[key];
          }
        }
        break;

      case 'clear':
        stateClone = {};
        break;
    }

    statesOfSteps.push({ ...stateClone });
  }

  return statesOfSteps;
}

module.exports = transformStateWithClones;
