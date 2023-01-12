'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const result = [];

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    switch (type) {
      case 'clear':
        clone = {};
        break;

      case 'addProperties':
        clone = Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const prop of keysToRemove) {
          delete clone[prop];
        };
        break;

      default:
        break;
    };

    result.push({ ...clone });
  }

  return result;
};

module.exports = transformStateWithClones;
