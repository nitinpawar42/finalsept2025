import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'new2025',
  location: 'asia-east1'
};

export const createApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateApplication', inputVars);
}
createApplicationRef.operationName = 'CreateApplication';

export function createApplication(dcOrVars, vars) {
  return executeMutation(createApplicationRef(dcOrVars, vars));
}

export const getApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetApplication', inputVars);
}
getApplicationRef.operationName = 'GetApplication';

export function getApplication(dcOrVars, vars) {
  return executeQuery(getApplicationRef(dcOrVars, vars));
}

export const listApplicationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListApplications');
}
listApplicationsRef.operationName = 'ListApplications';

export function listApplications(dc) {
  return executeQuery(listApplicationsRef(dc));
}

export const updateApplicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateApplication', inputVars);
}
updateApplicationRef.operationName = 'UpdateApplication';

export function updateApplication(dcOrVars, vars) {
  return executeMutation(updateApplicationRef(dcOrVars, vars));
}

