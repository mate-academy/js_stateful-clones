'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const parameter of actions) {
    if (parameter.type === 'addProperties') {
      Object.assign(clone, parameter.extraData);
    }

    if (parameter.type === 'removeProperties') {
      for (const property of parameter.keysToRemove) {
        delete clone[property];
      }
    }

    if (parameter.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
