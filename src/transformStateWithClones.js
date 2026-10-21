'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const results = [];
  const stateClone = {
    ...state,
  };

  for (const action of actions) {
    // if (action.type === 'addProperties') {
    //   Object.assign(stateClone, action.extraData);
    // } else if (action.type === 'removeProperties') {
    //   action.keysToRemove.forEach((key) => {
    //     delete stateClone[key];
    //   });
    // } else if (action.type === 'clear') {
    //   Object.keys(stateClone).forEach((key) => {
    //     delete stateClone[key];
    //   });

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateClone[key];
        });
        break;

      case 'clear':
        Object.keys(stateClone).forEach((key) => {
          delete stateClone[key];
        });
    }

    results.push({ ...stateClone });
  }

  return results;
}

module.exports = transformStateWithClones;
