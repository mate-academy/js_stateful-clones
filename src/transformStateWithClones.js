'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const firstState = { ...state };
  const changeState = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        const { extraData } = actions[i];

        Object.assign(firstState, extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete firstState[key];
        }
        break;

      case 'clear':
        for (const key in firstState) {
          delete firstState[key];
        }
        break;
    }
    changeState[i] = Object.assign({}, firstState);
  }

  return changeState;
}

module.exports = transformStateWithClones;
