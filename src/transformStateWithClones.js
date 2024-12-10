'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrState = [];

  actions.forEach((action) => {
    const baseS = arrState.length > 0 ? arrState[arrState.length - 1] : state;

    const stateClone = { ...baseS };

    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete stateClone[key];
      });
    } else if (action.type === 'clear') {
      Object.keys(stateClone).forEach((key) => {
        delete stateClone[key];
      });
    }

    arrState.push(stateClone);
  });

  return arrState;
}

module.exports = transformStateWithClones;
