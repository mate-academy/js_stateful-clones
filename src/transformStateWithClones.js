'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const current = {
    ...state,
  };

  for (const action in actions) {
    const { type, extraData, keysToRemove } = actions[action];

    switch (type) {
      case 'addProperties':
        Object.assign(current, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete current[key];
        }
        break;
      case 'clear':
        for (const property in current) {
          delete current[property];
        }
        break;
      default:
        throw new Error('Wrong type!');
    }

    states.push({
      ...current,
    });
  }

  return states;
}

module.exports = transformStateWithClones;
