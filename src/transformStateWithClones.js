'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const action = [];
  let currentObject = { ...state };

  for (const { type, extraData = {}, keysToRemove = [] } of actions) {
    if (type === 'addProperties') {
      currentObject = { ...currentObject, ...extraData };
    }

    if (type === 'removeProperties') {
      keysToRemove.forEach((key) => delete currentObject[key]);
    }

    if (type === 'clear') {
      currentObject = {};
    }
    action.push({ ...currentObject });
  }

  return action;
}

module.exports = transformStateWithClones;
