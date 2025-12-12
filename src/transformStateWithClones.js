'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const histotyCopy = [];

  for (const action of actions) {
    const nextCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextCopy[key];
        }
        break;

      case 'clear':
        for (const key in nextCopy) {
          delete nextCopy[key];
        }
        break;

      default:
        throw new Error('Action is not defined!');
    }

    histotyCopy.push(nextCopy);
    stateCopy = { ...nextCopy };
  }

  return histotyCopy;
}

module.exports = transformStateWithClones;
