'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = { ...state };
  const actionsResultArr = [];

  function addingActionResultToArray() {
    actionsResultArr.push({ ...stateCopy });
  }

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        addingActionResultToArray();
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete stateCopy[key];
        }
        addingActionResultToArray();
        break;

      case 'clear':
        stateCopy = {};
        addingActionResultToArray();
    }
  }

  return actionsResultArr;
}

module.exports = transformStateWithClones;
