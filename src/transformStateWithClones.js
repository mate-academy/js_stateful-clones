'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stagesOfModify = [];
  const modifyingState = { ...state };

  for (const action of actions) {
    const { type, ...rest } = action;
    let modifiedObject = {};

    switch (type) {
      case 'clear':
        modifiedObject = clear(modifyingState);
        break;
      case 'removeProperties':
        modifiedObject = removeProperties(modifyingState, rest);
        break;
      case 'addProperties':
        modifiedObject = addProperties(modifyingState, rest);
        break;
      default:
        break;
    }

    stagesOfModify.push({ ...modifiedObject });
  }

  return stagesOfModify;
};

function clear(obj) {
  for (const key of Object.keys(obj)) {
    delete obj[key];
  }

  return obj;
};

function addProperties(obj, addedProperties) {
  Object.assign(obj, addedProperties.extraData);

  return obj;
};

function removeProperties(obj, { keysToRemove }) {
  for (let i = 0; i < keysToRemove.length; i++) {
    delete obj[keysToRemove[i]];
  }

  return obj;
};

module.exports = transformStateWithClones;
