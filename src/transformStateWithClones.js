'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = { ...state };

  for (const i in actions) {
    const { type, extraData = {} } = actions[i];
    let { keysToRemove = [] } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      default:
        if (type === 'clear') {
          keysToRemove = Object.keys(stateCopy);
        }

        for (const j in keysToRemove) {
          const key = keysToRemove[j];

          if (Object.prototype.hasOwnProperty.call(stateCopy, key)) {
            delete stateCopy[key];
          }
        }
        break;
    }

    result.push(stateCopy);
    stateCopy = { ...stateCopy };
  }

  return result;
}

module.exports = transformStateWithClones;
