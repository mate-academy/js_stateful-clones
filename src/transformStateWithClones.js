'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = { ...state };
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in states) {
          delete states[key];
        }
        break;

      case 'addProperties':
        Object.assign(states, action.extraData);
        break;

      case 'removeProperties':
        for (const act of action.keysToRemove) {
          delete states[act];
        }
    }

    resultArr.push({ ...states });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
