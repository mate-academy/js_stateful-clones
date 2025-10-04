'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
/* for (const ch of actions) {
  if (ch.type === 'addProperties') {
    Object.assign(stateCopy, ch.extraData);
  }

  if (ch.type === 'removeProperties') {
    for (const key of ch.keysToRemove) {
      delete stateCopy[key];
    }
  }

  if (ch.type === 'clear') {
    for (const key in stateCopy) {
      delete stateCopy[key];
    }
  }
  result.push({ ...stateCopy });
}
*/
