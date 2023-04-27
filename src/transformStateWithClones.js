'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stagesOfModify = [];
  const modifyingState = JSON.parse(JSON.stringify(state));

  for (let i = 0; i < actions.length; i++) {
    const { type, ...rest } = actions[i];

    if (type === 'clear') {
      const objectCleared = { ...clear(modifyingState) };

      stagesOfModify.push(objectCleared);
    };

    if (type === 'removeProperties') {
      const objectRemovedProps = { ...removeProperties(modifyingState, rest) };

      stagesOfModify.push(objectRemovedProps);
    };

    if (type === 'addProperties') {
      const objectAddedProps = { ...addProperties(modifyingState, rest) };

      stagesOfModify.push(objectAddedProps);
    };
  };

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
