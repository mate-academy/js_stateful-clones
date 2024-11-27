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
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear' :
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default :
        throw new Error('Action type does not exist');
    }
    answer.push({ ...stateCopy });
  }

  return answer;
}

module.exports = transformStateWithClones;
