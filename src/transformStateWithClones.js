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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        statesOfSteps.push({ ...stateClone });
        continue;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateClone[key]) {
            delete stateClone[key];
          }
        }
        statesOfSteps.push({ ...stateClone });
        continue;

      case 'clear':
        stateClone = {};
        statesOfSteps.push({ ...stateClone });
        continue;
    }
  }

  return statesOfSteps;
}

module.exports = transformStateWithClones;
