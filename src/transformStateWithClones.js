'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const supportObj = {};
  const result = [];

  Object.assign(supportObj, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(supportObj, action.extraData);
        break;

      case 'removeProperties':
        for (const remProp of action.keysToRemove) {
          if (supportObj[remProp]) {
            delete supportObj[remProp];
          }
        };
        break;

      case 'clear':
        for (const prop in supportObj) {
          delete supportObj[prop];
        }
        break;
        
      default:
        return 'action is not found'
    }

    result.push(Object.assign({}, supportObj));
  }

  return result;
}

module.exports = transformStateWithClones;
