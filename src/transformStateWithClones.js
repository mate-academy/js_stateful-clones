'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      newState = { ...newState, ...obj.extraData };

      result.push(newState);
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        const { [key]: removed, ...rest } = newState;

        newState = rest;
      }
      result.push({ ...newState });
    } else if (obj.type === 'clear') {
      newState = {};
      result.push({ ...newState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
