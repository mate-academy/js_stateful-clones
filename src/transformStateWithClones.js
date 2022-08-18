'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': Object.assign(stateClone, actions[i].extraData);
        break;

      case 'removeProperties': actions[i].keysToRemove.map((key) => {
        delete stateClone[key];
      });
        break;

      case 'clear': Object.keys(stateClone).map((key) => {
        delete stateClone[key];
      });
        break;

      default:
        return 'It`s looks like something was wrong';
    }

    arr.push({ ...stateClone });
  }

  return arr;
}

module.exports = transformStateWithClones;
