'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloned = { ...state };
  const previousVersion = [];

  for (const element of actions) {
    const { type, extraData, keysToRemove } = element;

    switch (type) {
      case 'addProperties':
        Object.assign(cloned, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloned[key];
        }
        break;

      case 'clear':
        for (const key in cloned) {
          delete cloned[key];
        }
        break;

      default :
        return 'False operation';
    }

    previousVersion.push(Object.assign({}, cloned));
  }

  return previousVersion;
}

module.exports = transformStateWithClones;
