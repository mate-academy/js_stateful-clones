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
      delete stateClone[key];
    }
  }

  function clearAllProps() {
    for (const key in stateClone) {
      delete stateClone[key];
    }
  }

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    stateClone = { ...stateClone };

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
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
