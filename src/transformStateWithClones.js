'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const operationHandlers = initOperationHandlers();

function transformStateWithClones(state, actions) {
  const objectStatesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newObjectState = operationHandlers.get(action.type)(
      currentState,
      action,
    );

    objectStatesHistory.push(newObjectState);
    currentState = newObjectState;
  }

  return objectStatesHistory;
}

function initOperationHandlers() {
  const handlersMap = new Map();

  handlersMap.set('clear', handleClearOperation);
  handlersMap.set('addProperties', handleAddPropsOperation);
  handlersMap.set('removeProperties', handleRemovePropsOperation);

  return handlersMap;
}

function handleClearOperation(state, action) {
  return {};
}

function handleAddPropsOperation(state, action) {
  return {
    ...state,
    ...action.extraData,
  };
}

function handleRemovePropsOperation(state, action) {
  const newState = { ...state };

  action.keysToRemove.forEach((key) => delete newState[key]);

  return newState;
}

module.exports = transformStateWithClones;
