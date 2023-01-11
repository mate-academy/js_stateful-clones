'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClonesArr = [];
  let stateClone = { ...state };

  function removeProps(propsToRemove) {
    for (const key of propsToRemove) {
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
    stateClonesArr.push(stateClone);
  }

  return stateClonesArr;
}

module.exports = transformStateWithClones;
