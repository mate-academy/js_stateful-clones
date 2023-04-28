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

    switch (true) {
      case type === 'clear':
        const objectCleared
          = { ...clear(modifyingState) };

        stagesOfModify.push(objectCleared);
        break;
      case type === 'removeProperties':
        const objectRemovedProps
          = { ...removeProperties(modifyingState, rest) };

        stagesOfModify.push(objectRemovedProps);
        break;
      case type === 'addProperties':
        const objectAddedProps
          = { ...addProperties(modifyingState, rest) };

        stagesOfModify.push(objectAddedProps);
        break;
      default:
        break;
    }
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
