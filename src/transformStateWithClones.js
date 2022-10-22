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

  for (const elem of actions) {
    const { type, extraData, keysToRemove } = elem;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const remKeys of keysToRemove) {
          delete clone[remKeys];
        }
        break;

      case 'clear':
        for (const remProp in clone) {
          delete clone[remProp];
        }
        break;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
