'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resultArr = [];

  for (const action of actions) {
    transform(stateClone, action);
    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

function transform(clone, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(clone, action.extraData);
      break;

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
      break;
    }

    case 'clear': {
      for (const key of Object.keys(clone)) {
        delete clone[key];
      }
      break;
    }

    default: return {};
  }
}

module.exports = transformStateWithClones;
