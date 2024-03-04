'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const clone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const actionObj = actions[i];

    switch (actionObj.type) {
      case 'clear':
        for (const clearKey in clone) {
          if (Object.prototype.hasOwnProperty.call(clone, clearKey)) {
            delete clone[clearKey];
          }
        }

        arr.push({ ...clone });

        break;

      case 'addProperties':
        const data = actionObj.extraData;

        for (const dataKey in data) {
          const keyName = dataKey;
          const keyValue = data[dataKey];

          clone[keyName] = keyValue;
        }

        arr.push({ ...clone });

        break;

      case 'removeProperties':
        const remove = actionObj.keysToRemove;

        for (const stateKey in clone) {
          for (let j = 0; j < remove.length; j++) {
            if (stateKey === remove[j]) {
              delete clone[remove[j]];
            }
          }
        }

        arr.push({ ...clone });
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
