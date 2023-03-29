'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  let stateCopy = Object.assign({}, state);

  for (const transformAction of actions) {
    switch (transformAction.type) {
      case 'addProperties': {
        for (const property in transformAction.extraData) {
          stateCopy[property] = transformAction.extraData[property];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of transformAction.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'Wrong input data';
    }
    states.push(stateCopy);
    stateCopy = Object.assign({}, states[states.length - 1]);
  }

  return states;
}

module.exports = transformStateWithClones;
