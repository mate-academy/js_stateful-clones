'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    const { type, extraData = {}, keysToRemove = [] } = action;

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          stateCopy[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;

      default:
        Error(`${type} is not supported`);
    }

    states.push(structuredClone(stateCopy));
    stateCopy = Object.assign({}, states[states.length - 1]);

    console.log(stateCopy);
  }

  return states;
}

module.exports = transformStateWithClones;
