import { CreateApplicationData, CreateApplicationVariables, GetApplicationData, GetApplicationVariables, ListApplicationsData, UpdateApplicationData, UpdateApplicationVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateApplication(options?: useDataConnectMutationOptions<CreateApplicationData, FirebaseError, CreateApplicationVariables>): UseDataConnectMutationResult<CreateApplicationData, CreateApplicationVariables>;
export function useCreateApplication(dc: DataConnect, options?: useDataConnectMutationOptions<CreateApplicationData, FirebaseError, CreateApplicationVariables>): UseDataConnectMutationResult<CreateApplicationData, CreateApplicationVariables>;

export function useGetApplication(vars: GetApplicationVariables, options?: useDataConnectQueryOptions<GetApplicationData>): UseDataConnectQueryResult<GetApplicationData, GetApplicationVariables>;
export function useGetApplication(dc: DataConnect, vars: GetApplicationVariables, options?: useDataConnectQueryOptions<GetApplicationData>): UseDataConnectQueryResult<GetApplicationData, GetApplicationVariables>;

export function useListApplications(options?: useDataConnectQueryOptions<ListApplicationsData>): UseDataConnectQueryResult<ListApplicationsData, undefined>;
export function useListApplications(dc: DataConnect, options?: useDataConnectQueryOptions<ListApplicationsData>): UseDataConnectQueryResult<ListApplicationsData, undefined>;

export function useUpdateApplication(options?: useDataConnectMutationOptions<UpdateApplicationData, FirebaseError, UpdateApplicationVariables>): UseDataConnectMutationResult<UpdateApplicationData, UpdateApplicationVariables>;
export function useUpdateApplication(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateApplicationData, FirebaseError, UpdateApplicationVariables>): UseDataConnectMutationResult<UpdateApplicationData, UpdateApplicationVariables>;
