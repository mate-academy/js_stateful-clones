'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateList = [];
  let stateClone = { ...state };

  actions.forEach(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        stateClone = Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        stateClone = { ...stateClone };

        keysToRemove.forEach((key) => {
          delete stateClone[key];
        });
        break;
      default:
        stateClone = {};
    }

    stateList.push(stateClone);
    stateClone = { ...stateClone };
  });

  return stateList;
}

module.exports = transformStateWithClones;
