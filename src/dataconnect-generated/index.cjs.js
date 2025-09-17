const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'new2025',
  location: 'asia-east1'
};
exports.connectorConfig = connectorConfig;

const createApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateApplication', inputVars);
}
createApplicationRef.operationName = 'CreateApplication';
exports.createApplicationRef = createApplicationRef;

exports.createApplication = function createApplication(dcOrVars, vars) {
  return executeMutation(createApplicationRef(dcOrVars, vars));
};

const getApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetApplication', inputVars);
}
getApplicationRef.operationName = 'GetApplication';
exports.getApplicationRef = getApplicationRef;

exports.getApplication = function getApplication(dcOrVars, vars) {
  return executeQuery(getApplicationRef(dcOrVars, vars));
};

const listApplicationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListApplications');
}
listApplicationsRef.operationName = 'ListApplications';
exports.listApplicationsRef = listApplicationsRef;

exports.listApplications = function listApplications(dc) {
  return executeQuery(listApplicationsRef(dc));
};

const updateApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateApplication', inputVars);
}
updateApplicationRef.operationName = 'UpdateApplication';
exports.updateApplicationRef = updateApplicationRef;

exports.updateApplication = function updateApplication(dcOrVars, vars) {
  return executeMutation(updateApplicationRef(dcOrVars, vars));
};
