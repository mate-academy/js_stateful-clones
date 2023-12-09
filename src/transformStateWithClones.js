'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const objToPushresult = { ...state };

  for (const action of actions) {
    switch (true) {
      case (action.type === 'clear'):
        for (const key in objToPushresult) {
          delete objToPushresult[key];
        };
        break;
      case (action.type === 'addProperties'):
        Object.assign(objToPushresult, action.extraData);
        break;
      case (action.type === 'removeProperties'):
        for (const key of action['keysToRemove']) {
          if (key in objToPushresult) {
            delete objToPushresult[key];
          };
        }
        break;
    }
    result.push({ ...objToPushresult });
  }

  return result;
}

module.exports = transformStateWithClones;
