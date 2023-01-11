'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateArr = [];
  let stateClone = { ...state };

  function removeProps(properties) {
    for (const key of properties) {
      stateClone = { ...stateClone };
      delete stateClone[key];
    }
  }

  function clearAllProps() {
    for (const key in stateClone) {
      stateClone = { ...stateClone };
      delete stateClone[key];
    }
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateClone = {
          ...stateClone,
          ...extraData,
        };
        break;
      case 'removeProperties':
        removeProps(keysToRemove);
        break;
      case 'clear':
        clearAllProps();
        break;
      default:
        return actions;
    }
    stateArr.push(stateClone);
  }

  return stateArr;
}

module.exports = transformStateWithClones;
