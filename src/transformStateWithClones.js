'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateClone = Object.assign({}, state);

  actions.forEach(function (element) {
    if (element.type === 'clear') {
      stateClone = {};
      stateHistory.push({ ...stateClone });
    }

    if (element.type === 'addProperties') {
      stateClone = { ...stateClone, ...element.extraData };
      stateHistory.push({ ...stateClone });
    }

    if (element.type === 'removeProperties') {
      element.keysToRemove.forEach(function (key) {
        delete stateClone[key];
      });

      stateHistory.push({ ...stateClone });
    }
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
