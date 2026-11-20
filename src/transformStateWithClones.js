'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let nextStage = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextStage = {};
        break;
      case 'addProperties':
        Object.assign(nextStage, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextStage[key];
        }
        break;
    }
    history.push(nextStage);
    currentState = nextStage;
  }

  return history;
}

module.exports = transformStateWithClones;
