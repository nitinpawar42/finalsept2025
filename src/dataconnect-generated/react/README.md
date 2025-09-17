# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetApplication*](#getapplication)
  - [*ListApplications*](#listapplications)
- [**Mutations**](#mutations)
  - [*CreateApplication*](#createapplication)
  - [*UpdateApplication*](#updateapplication)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `example`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetApplication
You can execute the `GetApplication` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetApplication(dc: DataConnect, vars: GetApplicationVariables, options?: useDataConnectQueryOptions<GetApplicationData>): UseDataConnectQueryResult<GetApplicationData, GetApplicationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetApplication(vars: GetApplicationVariables, options?: useDataConnectQueryOptions<GetApplicationData>): UseDataConnectQueryResult<GetApplicationData, GetApplicationVariables>;
```

### Variables
The `GetApplication` Query requires an argument of type `GetApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetApplicationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetApplication` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetApplication` Query is of type `GetApplicationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetApplicationData {
  application?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    organization: string;
    submissionDeadline: TimestampString;
    createdAt: TimestampString;
    link?: string | null;
    notes?: string | null;
    status: {
      id: UUIDString;
      name: string;
    } & ApplicationStatus_Key;
      applicationType?: {
        id: UUIDString;
        name: string;
      } & ApplicationType_Key;
        user?: {
          id: UUIDString;
          displayName: string;
          email?: string | null;
          photoUrl?: string | null;
          createdAt: TimestampString;
        } & User_Key;
          attachments_on_application: ({
            id: UUIDString;
            fileName: string;
            fileUrl: string;
            description?: string | null;
          } & Attachment_Key)[];
            importantDates_on_application: ({
              id: UUIDString;
              date: DateString;
              type: string;
              description?: string | null;
            } & ImportantDate_Key)[];
  } & Application_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetApplication`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetApplicationVariables } from '@dataconnect/generated';
import { useGetApplication } from '@dataconnect/generated/react'

export default function GetApplicationComponent() {
  // The `useGetApplication` Query hook requires an argument of type `GetApplicationVariables`:
  const getApplicationVars: GetApplicationVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetApplication(getApplicationVars);
  // Variables can be defined inline as well.
  const query = useGetApplication({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetApplication(dataConnect, getApplicationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetApplication(getApplicationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetApplication(dataConnect, getApplicationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.application);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListApplications
You can execute the `ListApplications` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListApplications(dc: DataConnect, options?: useDataConnectQueryOptions<ListApplicationsData>): UseDataConnectQueryResult<ListApplicationsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListApplications(options?: useDataConnectQueryOptions<ListApplicationsData>): UseDataConnectQueryResult<ListApplicationsData, undefined>;
```

### Variables
The `ListApplications` Query has no variables.
### Return Type
Recall that calling the `ListApplications` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListApplications` Query is of type `ListApplicationsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListApplicationsData {
  applications: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    organization: string;
    submissionDeadline: TimestampString;
  } & Application_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListApplications`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListApplications } from '@dataconnect/generated/react'

export default function ListApplicationsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListApplications();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListApplications(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListApplications(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListApplications(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.applications);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateApplication
You can execute the `CreateApplication` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateApplication(options?: useDataConnectMutationOptions<CreateApplicationData, FirebaseError, CreateApplicationVariables>): UseDataConnectMutationResult<CreateApplicationData, CreateApplicationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateApplication(dc: DataConnect, options?: useDataConnectMutationOptions<CreateApplicationData, FirebaseError, CreateApplicationVariables>): UseDataConnectMutationResult<CreateApplicationData, CreateApplicationVariables>;
```

### Variables
The `CreateApplication` Mutation requires an argument of type `CreateApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateApplicationVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      applicationTypeId?: UUIDString | null;
      applicationTypeId_expr?: {
      };
        statusId?: UUIDString | null;
        statusId_expr?: {
        };
          userId?: UUIDString | null;
          userId_expr?: {
          };
            applicationType?: ApplicationType_Key | null;
            status?: ApplicationStatus_Key | null;
            user?: User_Key | null;
            createdAt?: TimestampString | null;
            createdAt_expr?: {
            };
              createdAt_time?: {
                now?: {
                };
                  at?: TimestampString | null;
                  add?: {
                    milliseconds?: number;
                    seconds?: number;
                    minutes?: number;
                    hours?: number;
                    days?: number;
                    weeks?: number;
                    months?: number;
                    years?: number;
                  };
                    sub?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      truncateTo?: Timestamp_Interval | null;
              };
                createdAt_update?: ({
                  inc?: {
                    milliseconds?: number;
                    seconds?: number;
                    minutes?: number;
                    hours?: number;
                    days?: number;
                    weeks?: number;
                    months?: number;
                    years?: number;
                  };
                    dec?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                })[];
                  description?: string | null;
                  description_expr?: {
                  };
                    link?: string | null;
                    link_expr?: {
                    };
                      notes?: string | null;
                      notes_expr?: {
                      };
                        organization?: string | null;
                        organization_expr?: {
                        };
                          submissionDeadline?: TimestampString | null;
                          submissionDeadline_expr?: {
                          };
                            submissionDeadline_time?: {
                              now?: {
                              };
                                at?: TimestampString | null;
                                add?: {
                                  milliseconds?: number;
                                  seconds?: number;
                                  minutes?: number;
                                  hours?: number;
                                  days?: number;
                                  weeks?: number;
                                  months?: number;
                                  years?: number;
                                };
                                  sub?: {
                                    milliseconds?: number;
                                    seconds?: number;
                                    minutes?: number;
                                    hours?: number;
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                                    truncateTo?: Timestamp_Interval | null;
                            };
                              submissionDeadline_update?: ({
                                inc?: {
                                  milliseconds?: number;
                                  seconds?: number;
                                  minutes?: number;
                                  hours?: number;
                                  days?: number;
                                  weeks?: number;
                                  months?: number;
                                  years?: number;
                                };
                                  dec?: {
                                    milliseconds?: number;
                                    seconds?: number;
                                    minutes?: number;
                                    hours?: number;
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                              })[];
                                title?: string | null;
                                title_expr?: {
                                };
  };
}
```
### Return Type
Recall that calling the `CreateApplication` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateApplication` Mutation is of type `CreateApplicationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateApplicationData {
  application_insert: Application_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateApplication`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateApplicationVariables } from '@dataconnect/generated';
import { useCreateApplication } from '@dataconnect/generated/react'

export default function CreateApplicationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateApplication();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateApplication(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateApplication(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateApplication(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateApplication` Mutation requires an argument of type `CreateApplicationVariables`:
  const createApplicationVars: CreateApplicationVariables = {
    data: ..., 
  };
  mutation.mutate(createApplicationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ data: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createApplicationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.application_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateApplication
You can execute the `UpdateApplication` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateApplication(options?: useDataConnectMutationOptions<UpdateApplicationData, FirebaseError, UpdateApplicationVariables>): UseDataConnectMutationResult<UpdateApplicationData, UpdateApplicationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateApplication(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateApplicationData, FirebaseError, UpdateApplicationVariables>): UseDataConnectMutationResult<UpdateApplicationData, UpdateApplicationVariables>;
```

### Variables
The `UpdateApplication` Mutation requires an argument of type `UpdateApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateApplicationVariables {
  id: UUIDString;
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      applicationTypeId?: UUIDString | null;
      applicationTypeId_expr?: {
      };
        statusId?: UUIDString | null;
        statusId_expr?: {
        };
          userId?: UUIDString | null;
          userId_expr?: {
          };
            applicationType?: ApplicationType_Key | null;
            status?: ApplicationStatus_Key | null;
            user?: User_Key | null;
            createdAt?: TimestampString | null;
            createdAt_expr?: {
            };
              createdAt_time?: {
                now?: {
                };
                  at?: TimestampString | null;
                  add?: {
                    milliseconds?: number;
                    seconds?: number;
                    minutes?: number;
                    hours?: number;
                    days?: number;
                    weeks?: number;
                    months?: number;
                    years?: number;
                  };
                    sub?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      truncateTo?: Timestamp_Interval | null;
              };
                createdAt_update?: ({
                  inc?: {
                    milliseconds?: number;
                    seconds?: number;
                    minutes?: number;
                    hours?: number;
                    days?: number;
                    weeks?: number;
                    months?: number;
                    years?: number;
                  };
                    dec?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                })[];
                  description?: string | null;
                  description_expr?: {
                  };
                    link?: string | null;
                    link_expr?: {
                    };
                      notes?: string | null;
                      notes_expr?: {
                      };
                        organization?: string | null;
                        organization_expr?: {
                        };
                          submissionDeadline?: TimestampString | null;
                          submissionDeadline_expr?: {
                          };
                            submissionDeadline_time?: {
                              now?: {
                              };
                                at?: TimestampString | null;
                                add?: {
                                  milliseconds?: number;
                                  seconds?: number;
                                  minutes?: number;
                                  hours?: number;
                                  days?: number;
                                  weeks?: number;
                                  months?: number;
                                  years?: number;
                                };
                                  sub?: {
                                    milliseconds?: number;
                                    seconds?: number;
                                    minutes?: number;
                                    hours?: number;
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                                    truncateTo?: Timestamp_Interval | null;
                            };
                              submissionDeadline_update?: ({
                                inc?: {
                                  milliseconds?: number;
                                  seconds?: number;
                                  minutes?: number;
                                  hours?: number;
                                  days?: number;
                                  weeks?: number;
                                  months?: number;
                                  years?: number;
                                };
                                  dec?: {
                                    milliseconds?: number;
                                    seconds?: number;
                                    minutes?: number;
                                    hours?: number;
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                              })[];
                                title?: string | null;
                                title_expr?: {
                                };
  };
}
```
### Return Type
Recall that calling the `UpdateApplication` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateApplication` Mutation is of type `UpdateApplicationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateApplicationData {
  application_update?: Application_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateApplication`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateApplicationVariables } from '@dataconnect/generated';
import { useUpdateApplication } from '@dataconnect/generated/react'

export default function UpdateApplicationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateApplication();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateApplication(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateApplication(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateApplication(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateApplication` Mutation requires an argument of type `UpdateApplicationVariables`:
  const updateApplicationVars: UpdateApplicationVariables = {
    id: ..., 
    data: ..., 
  };
  mutation.mutate(updateApplicationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., data: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateApplicationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.application_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

