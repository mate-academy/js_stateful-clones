'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const stateClone = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
      history.push({ ...stateClone });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
      history.push({ ...stateClone });
    } else if (action.type === 'clear') {
      const keys = Object.keys(stateClone);

      for (const key of keys) {
        delete stateClone[key];
      }
      history.push({ ...stateClone });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
