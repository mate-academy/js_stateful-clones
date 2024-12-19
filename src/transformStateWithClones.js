'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const historyArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const newCopy = Object.assign({}, historyArray[historyArray.length - 1]);
    let stateStep;

    switch (action.type) {
      case 'addProperties':
        if (historyArray.length >= 1) {
          stateStep = addProperties(newCopy, action.extraData);
          break;
        } else {
          stateStep = addProperties(stateCopy, action.extraData);
          break;
        }

      case 'removeProperties':
        if (historyArray.length >= 1) {
          stateStep = removeProperties(newCopy, action.keysToRemove);
          break;
        } else {
          stateStep = removeProperties(stateCopy, action.keysToRemove);
          break;
        }

      case 'clear':
        if (historyArray.length >= 1) {
          stateStep = clearProperties(newCopy);
          break;
        } else {
          stateStep = clearProperties(stateCopy);
          break;
        }

      default:
        return 'Uncorrectable types';
    }

    historyArray.push(stateStep);
  }

  function addProperties(stateCopyObject, extraData) {
    return Object.assign(stateCopyObject, extraData);
  }

  function removeProperties(stateCopyObject, keysToRemove) {
    for (const key of keysToRemove) {
      delete stateCopyObject[key];
    }

    return stateCopyObject;
  }

  function clearProperties(stateCopyObject) {
    for (const key in stateCopyObject) {
      delete stateCopyObject[key];
    }

    return stateCopyObject;
  }

  return historyArray;
}

module.exports = transformStateWithClones;
