'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const answer = [];
  const clone = { ...state };

  for (const number in actions) {
    const { type, extraData, keysToRemove } = actions[number];

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;
      case 'removeProperties':
        for (const i in keysToRemove) {
          delete clone[keysToRemove[i]];
        }
        break;
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    const currentState = { ...clone };

    answer.push(currentState);
  }

  return answer;
}

module.exports = transformStateWithClones;
