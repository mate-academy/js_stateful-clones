'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfObjects = [];
  const newObj = { ...state };
  const err1 = Error('Something went wrong');

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        for (const actKey in act.extraData) {
          newObj[actKey] = act.extraData[actKey];
        }
        break;

      case 'removeProperties':
        for (const removeKeys of act.keysToRemove) {
          delete newObj[removeKeys];
        }
        break;

      // eslint-disable-next-line no-fallthrough
      case 'clear':
        for (const stateKey in state) {
          delete newObj[stateKey];
        }
        break;

      default:
        throw err1;
    }

    arrayOfObjects.push({ ...newObj });
  }

  return arrayOfObjects;
}

module.exports = transformStateWithClones;
