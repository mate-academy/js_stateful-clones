'use strict';

const transformStateLibrary = require('./transformStateLibrary');

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateDeepCopy = JSON.parse(JSON.stringify(state));

  return actions.map((item) => {
    return { ...transformStateLibrary[item.type](stateDeepCopy, item) };
  });
}

module.exports = transformStateWithClones;
