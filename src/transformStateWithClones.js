'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const answer = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(stateCopy, extraData);
        break;
      }

      case 'removeProperties': {
        for (let i = 0; i < keysToRemove.length; i++) {
          delete stateCopy[keysToRemove[i]];
        }
        break;
      }

      case 'clear' : {
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;
      }

      default : {
        throw new Error('ERROR');
      }
    }
    answer.push({ ...stateCopy });
  }

  return answer;
}

module.exports = transformStateWithClones;
