'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const options = Object.values(actions);
  const result = [];
  let stateCopy = { ...state };

  for (const option of options) {
    const { keysToRemove, type, extraData } = option;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
    }

    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;
