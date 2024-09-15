'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneRobot = [];
  const cloneState = { ...state };

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties':
        for (const add in extraData) {
          cloneState[add] = extraData[add];
        }
        break;

      case 'removeProperties':
        for (const remove of keysToRemove) {
          delete cloneState[remove];
        }
        break;

      case 'clear':
        for (const char in cloneState) {
          delete cloneState[char];
        }
        break;

      default:
        return 'Array is not defined';
    }

    cloneRobot.push({ ...cloneState });
  }

  return cloneRobot;
}

module.exports = transformStateWithClones;
