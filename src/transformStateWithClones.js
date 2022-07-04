'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const statePrepared = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(statePrepared, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete statePrepared[key];
        }
        break;
      case 'clear':
        for (const key in statePrepared) {
          delete statePrepared[key];
        }
        break;
      default:
        throw new Error('Invalid value');
    }

    history.push(Object.assign({}, statePrepared));
  }

  return history;
}

module.exports = transformStateWithClones;
