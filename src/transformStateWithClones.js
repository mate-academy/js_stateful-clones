'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 *
 * transformStateWithClones(state, [
 * {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
 * {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
 * {type: 'addProperties', extraData: {another: 'one'}}
 * ])
 */
function transformStateWithClones(state, actions) {
  const Clones = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete newState[property];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        throw new Error('Invalid command type');
    }

    Clones.push(Object.assign({}, newState));
  }

  return Clones;
}

module.exports = transformStateWithClones;
