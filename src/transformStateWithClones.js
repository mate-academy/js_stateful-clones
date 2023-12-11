'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const result = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          stateCopy[key] = item.extraData[key];
        };
        // пушимо через деструктурізацію, зберігаючи модифікований об'єкт
        result.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete stateCopy[key];
        };
        // пушимо через деструктурізацію, зберігаючи модифікований об'єкт
        result.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        // пушимо через деструктурізацію
        result.push({ ...stateCopy });
        break;

      default: break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
