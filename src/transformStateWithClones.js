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
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const type in action.keysToRemove) {
          delete clone[action.keysToRemove[type]];
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
