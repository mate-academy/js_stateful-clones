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
    switch (action.type) {
      case 'clear':
        clone = {};
        break;

      case 'addProperties':
        clone = Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete clone[prop];
        };
        break;

      default:
        // eslint-disable-next-line no-console
        console.log('Action not found');
    };

    result.push({ ...clone });
  }

  return result;
};

module.exports = transformStateWithClones;
