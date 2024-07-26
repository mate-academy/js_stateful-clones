'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const item of actions) {
    if (item.type === 'addProperties') {
      // if our 'result' arr has no therefore we use state obj
      if (result.length === 0) {
        const objWithAddedProps = Object.assign({}, state, item.extraData);

        result.push(objWithAddedProps);
      } else {
        // if our 'result' arr has last item then we use last item
        const objWithAddedProps = Object.assign(
          {},
          result[result.length - 1],
          item.extraData,
        );

        result.push(objWithAddedProps);
      }
    }

    if (item.type === 'removeProperties') {
      let objWithRemovedProps;
      // if our 'result' arr has no therefore we use state obj

      if (result.length === 0) {
        objWithRemovedProps = Object.assign({}, state);

        // if our 'result' arr has last item then we use last item
      } else {
        objWithRemovedProps = Object.assign({}, result[result.length - 1]);
      }

      for (const key in item.keysToRemove) {
        const propKeyToRemove = item.keysToRemove[key];

        delete objWithRemovedProps[propKeyToRemove];
      }
      result.push(objWithRemovedProps);
    }

    if (item.type === 'clear') {
      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
