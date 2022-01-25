'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newRobot = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        newRobot = {
          ...newRobot,
          ...action.extraData,
        };
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete newRobot[key];
        };
        break;

      case 'clear' :
        newRobot = {};
        break;
    }
    result.push({ ...newRobot });
  }

  return result;
}

module.exports = transformStateWithClones;
