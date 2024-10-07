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

  actions.forEach(function (element, index) {
    switch (element.type) {
      case 'clear':
        stateClone = {};
        break;
      case 'addProperties':
        stateClone = { ...stateClone, ...element.extraData };
        break;
      case 'removeProperties':
        element.keysToRemove.forEach(function (key) {
          delete stateClone[key];
        });
        break;
    }
    stateHistory.push({ ...stateClone });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
