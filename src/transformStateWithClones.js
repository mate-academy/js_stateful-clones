'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = structuredClone(state);

  const addProperties = (obj) => {
    const newState = structuredClone(stateCopy);

    Object.keys(obj).forEach((key) => {
      newState[key] = obj[key];
    });

    stateCopy = newState;
  };

  const removeProperties = (obj) => {
    const newState = structuredClone(stateCopy);

    Object.keys(obj).forEach((key) => {
      delete newState[key];
    });

    stateCopy = newState;
  };

  const clear = () => {
    stateCopy = {};
  };

  actions.forEach((el) => {
    switch (el.type) {
      case 'addProperties':
        addProperties(el.extraData);
        break;
      case 'removeProperties':
        removeProperties(el.keysToRemove);
        break;
      default:
        clear();
    }

    stateHistory.push(stateCopy);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
