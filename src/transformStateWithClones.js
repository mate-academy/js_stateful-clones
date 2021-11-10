'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const types of keysToRemove) {
          delete clone[types];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
    }

    result.push({ ...clone });
  }

  return result;
};

module.exports = transformStateWithClones;
