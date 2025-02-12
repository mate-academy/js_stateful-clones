'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateDuplicate = structuredClone(state);
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(stateDuplicate, extraData);
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        if (Object.hasOwn(stateDuplicate, key)) {
          delete stateDuplicate[key];
        }
      }
    } else if (type === 'clear') {
      for (const key of Object.keys(stateDuplicate)) {
        delete stateDuplicate[key];
      }
    }
    result.push(structuredClone(stateDuplicate));
  }

  return result;
}

module.exports = transformStateWithClones;
