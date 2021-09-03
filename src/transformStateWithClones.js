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
  const resultArray = Array(actions.length);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      resultArray[i] = addProperties(tempState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      resultArray[i] = removeProperties(tempState, actions[i].keysToRemove);
    } else if (actions[i].type === 'clear') {
      resultArray[i] = removeProperties(tempState, null, true);
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

const removeProperties = (objFrom, properties, clear = false) => {
  if (!clear) {
    if (properties !== undefined) {
      for (const key of properties) {
        delete objFrom[key];
      }
    }
  } else {
    for (const key of Object.keys(objFrom)) {
      delete objFrom[key];
    }
  }

  return { ...objFrom };
};

module.exports = transformStateWithClones;
