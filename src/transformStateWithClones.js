'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  const results = [Object.assign({}, state)];

  for (const action of actions) {
    const type = action.type;
    let newState = Object.assign({}, results[results.length - 1]);

    switch (type) {
      case 'addProperties': {
        newState = Object.assign(newState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default: {
        throw new Error('Something is wrong...');
      }
    }
    results.push(newState);
  }

  return results.slice(1);
};

module.exports = transformStateWithClones;
