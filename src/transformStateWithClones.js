'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateCloneArr = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    } else if (action.type === 'removeProperties') {
      const keys = action.keysToRemove;

      keys.forEach((k) => {
        delete stateClone[k];
      });
    } else if (action.type === 'clear') {
      Object.keys(stateClone).forEach((key) => delete stateClone[key]);
    }
    stateCloneArr.push(Object.assign({}, stateClone));
  });

  // Push the final state clone after all actions
  return stateCloneArr;
}

module.exports = transformStateWithClones;
