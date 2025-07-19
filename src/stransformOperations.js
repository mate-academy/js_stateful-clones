'use strict';

function addProps(stateData, extraData) {
  for (const key in extraData) {
    stateData[key] = extraData[key];
  }
}

function removeProps(stateData, removeKeys) {
  for (const removeKey of removeKeys) {
    delete stateData[removeKey];
  }
}

function clearProps(stateData) {
  Object.keys(stateData).forEach((key) => delete stateData[key]);
}

module.exports = {
  addProps,
  removeProps,
  clearProps,
};
