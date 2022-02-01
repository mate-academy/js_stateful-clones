'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const rezult = [];
  const item = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(item, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete item[key];
        }
        break;

      case 'clear':
        for (const key in item) {
          delete item[key];
        }
        break;

      default:
        break;
    }

    rezult.push({ ...item });
  }

  return rezult;
}

module.exports = transformStateWithClones;
