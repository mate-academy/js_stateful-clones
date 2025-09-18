/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        console.warn('Unsupported action type:', action.type);
        break;
    }

    result.push({ ...stateCopy });
  }

  console.log(result);

  return result;
}

function addProperties(state, extraData) {
  if (!extraData || typeof extraData !== 'object' || Array.isArray(extraData)) {
    return state;
  }

  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  if (!Array.isArray(keysToRemove) || keysToRemove.length === 0) {
    return state;
  }

  const nextState = { ...state };

  for (const key of keysToRemove) {
    if (Object.hasOwn(nextState, key)) {
      delete nextState[key];
    }
  }

  return nextState;
}

module.exports = transformStateWithClones;
