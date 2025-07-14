'use strict';

/**
 * @param {Object} newState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];

  let stateCopy = { ...state };

  for (const i of actions) {
    const newState = { ...stateCopy };

    switch (i.type) {
      case 'addProperties':
        addProperties(newState, i.extraData);
        break;
      case 'removeProperties':
        removeProperties(newState, i.keysToRemove);
        break;
      case 'clear':
        clear(newState);
        break;
    }

    stateCopy = { ...newState };

    actionsArray.push(stateCopy);
  }

  function addProperties(stateCopy2, extraData) {
    Object.assign(stateCopy2, extraData);
  }

  function removeProperties(stateCopy2, keysToRemove) {
    for (const el of keysToRemove) {
      delete stateCopy2[el];
    }
  }

  function clear(stateCopy2) {
    for (const el in stateCopy2) {
      delete stateCopy2[el];
    }
  }

  return actionsArray;
}

module.exports = transformStateWithClones;
