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
        stateCopy = clearProperties(stateCopy);
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

function addProperties(state, actionData) {
  return Object.assign(state, actionData);
}

function removeProperties(state, actionData) {
  const copyState = { ...state };

  for (const key of actionData) {
    delete copyState[key];
  }

  return copyState;
}

function clearProperties(state) {
  return {};
}

module.exports = transformStateWithClones;
