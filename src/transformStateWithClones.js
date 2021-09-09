'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const tempState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        resultArray.push(addProperties(tempState, action.extraData));
        break;
      case 'removeProperties':
        resultArray.push(removeProperties(tempState, action.keysToRemove));
        break;
      case 'clear':
        resultArray.push(clearProperties(tempState));
        break;
      default:
    }
  }

  return resultArray;
}

const addProperties = (objTo, objFrom) => {
  for (const key of Object.keys(objFrom)) {
    objTo[key] = objFrom[key];
  }

  return { ...objTo };
};

const removeProperties = (objFrom, properties) => {
  for (const key of properties) {
    delete objFrom[key];
  }

  return { ...objFrom };
};

const clearProperties = (objFrom) => {
  for (const key of Object.keys(objFrom)) {
    delete objFrom[key];
  }

  return { ...objFrom };
};

module.exports = transformStateWithClones;
