# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetApplication*](#getapplication)
  - [*ListApplications*](#listapplications)
- [**Mutations**](#mutations)
  - [*CreateApplication*](#createapplication)
  - [*UpdateApplication*](#updateapplication)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetApplication
You can execute the `GetApplication` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getApplication(vars: GetApplicationVariables): QueryPromise<GetApplicationData, GetApplicationVariables>;

interface GetApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetApplicationVariables): QueryRef<GetApplicationData, GetApplicationVariables>;
}
export const getApplicationRef: GetApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getApplication(dc: DataConnect, vars: GetApplicationVariables): QueryPromise<GetApplicationData, GetApplicationVariables>;

interface GetApplicationRef {
  ...
  (dc: DataConnect, vars: GetApplicationVariables): QueryRef<GetApplicationData, GetApplicationVariables>;
}
export const getApplicationRef: GetApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getApplicationRef:
```typescript
const name = getApplicationRef.operationName;
console.log(name);
```

### Variables
The `GetApplication` query requires an argument of type `GetApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetApplicationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetApplication` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `GetApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getApplication, GetApplicationVariables } from '@dataconnect/generated';

// The `GetApplication` query requires an argument of type `GetApplicationVariables`:
const getApplicationVars: GetApplicationVariables = {
  id: ..., 
};

// Call the `getApplication()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getApplication(getApplicationVars);
// Variables can be defined inline as well.
const { data } = await getApplication({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getApplication(dataConnect, getApplicationVars);

console.log(data.application);

// Or, you can use the `Promise` API.
getApplication(getApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.application);
});
```

### Using `GetApplication`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getApplicationRef, GetApplicationVariables } from '@dataconnect/generated';

// The `GetApplication` query requires an argument of type `GetApplicationVariables`:
const getApplicationVars: GetApplicationVariables = {
  id: ..., 
};

// Call the `getApplicationRef()` function to get a reference to the query.
const ref = getApplicationRef(getApplicationVars);
// Variables can be defined inline as well.
const ref = getApplicationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getApplicationRef(dataConnect, getApplicationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.application);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.application);
});
```

## ListApplications
You can execute the `ListApplications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listApplications(): QueryPromise<ListApplicationsData, undefined>;

interface ListApplicationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListApplicationsData, undefined>;
}
export const listApplicationsRef: ListApplicationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listApplications(dc: DataConnect): QueryPromise<ListApplicationsData, undefined>;

interface ListApplicationsRef {
  ...
  (dc: DataConnect): QueryRef<ListApplicationsData, undefined>;
}
export const listApplicationsRef: ListApplicationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listApplicationsRef:
```typescript
const name = listApplicationsRef.operationName;
console.log(name);
```

### Variables
The `ListApplications` query has no variables.
### Return Type
Recall that executing the `ListApplications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListApplicationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
### Using `ListApplications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listApplications } from '@dataconnect/generated';


// Call the `listApplications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listApplications();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listApplications(dataConnect);

console.log(data.applications);

// Or, you can use the `Promise` API.
listApplications().then((response) => {
  const data = response.data;
  console.log(data.applications);
});
```

### Using `ListApplications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listApplicationsRef } from '@dataconnect/generated';


// Call the `listApplicationsRef()` function to get a reference to the query.
const ref = listApplicationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listApplicationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.applications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.applications);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateApplication
You can execute the `CreateApplication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createApplication(vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;

interface CreateApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
}
export const createApplicationRef: CreateApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createApplication(dc: DataConnect, vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;

interface CreateApplicationRef {
  ...
  (dc: DataConnect, vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
}
export const createApplicationRef: CreateApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createApplicationRef:
```typescript
const name = createApplicationRef.operationName;
console.log(name);
```

### Variables
The `CreateApplication` mutation requires an argument of type `CreateApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `CreateApplication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateApplicationData {
  application_insert: Application_Key;
}
```
### Using `CreateApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createApplication, CreateApplicationVariables } from '@dataconnect/generated';

// The `CreateApplication` mutation requires an argument of type `CreateApplicationVariables`:
const createApplicationVars: CreateApplicationVariables = {
  data: ..., 
};

// Call the `createApplication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createApplication(createApplicationVars);
// Variables can be defined inline as well.
const { data } = await createApplication({ data: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createApplication(dataConnect, createApplicationVars);

console.log(data.application_insert);

// Or, you can use the `Promise` API.
createApplication(createApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.application_insert);
});
```

### Using `CreateApplication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createApplicationRef, CreateApplicationVariables } from '@dataconnect/generated';

// The `CreateApplication` mutation requires an argument of type `CreateApplicationVariables`:
const createApplicationVars: CreateApplicationVariables = {
  data: ..., 
};

// Call the `createApplicationRef()` function to get a reference to the mutation.
const ref = createApplicationRef(createApplicationVars);
// Variables can be defined inline as well.
const ref = createApplicationRef({ data: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createApplicationRef(dataConnect, createApplicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.application_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.application_insert);
});
```

## UpdateApplication
You can execute the `UpdateApplication` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateApplication(vars: UpdateApplicationVariables): MutationPromise<UpdateApplicationData, UpdateApplicationVariables>;

interface UpdateApplicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateApplicationVariables): MutationRef<UpdateApplicationData, UpdateApplicationVariables>;
}
export const updateApplicationRef: UpdateApplicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateApplication(dc: DataConnect, vars: UpdateApplicationVariables): MutationPromise<UpdateApplicationData, UpdateApplicationVariables>;

interface UpdateApplicationRef {
  ...
  (dc: DataConnect, vars: UpdateApplicationVariables): MutationRef<UpdateApplicationData, UpdateApplicationVariables>;
}
export const updateApplicationRef: UpdateApplicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateApplicationRef:
```typescript
const name = updateApplicationRef.operationName;
console.log(name);
```

### Variables
The `UpdateApplication` mutation requires an argument of type `UpdateApplicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
Recall that executing the `UpdateApplication` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateApplicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateApplicationData {
  application_update?: Application_Key | null;
}
```
### Using `UpdateApplication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateApplication, UpdateApplicationVariables } from '@dataconnect/generated';

// The `UpdateApplication` mutation requires an argument of type `UpdateApplicationVariables`:
const updateApplicationVars: UpdateApplicationVariables = {
  id: ..., 
  data: ..., 
};

// Call the `updateApplication()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateApplication(updateApplicationVars);
// Variables can be defined inline as well.
const { data } = await updateApplication({ id: ..., data: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateApplication(dataConnect, updateApplicationVars);

console.log(data.application_update);

// Or, you can use the `Promise` API.
updateApplication(updateApplicationVars).then((response) => {
  const data = response.data;
  console.log(data.application_update);
});
```

### Using `UpdateApplication`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateApplicationRef, UpdateApplicationVariables } from '@dataconnect/generated';

// The `UpdateApplication` mutation requires an argument of type `UpdateApplicationVariables`:
const updateApplicationVars: UpdateApplicationVariables = {
  id: ..., 
  data: ..., 
};

// Call the `updateApplicationRef()` function to get a reference to the mutation.
const ref = updateApplicationRef(updateApplicationVars);
// Variables can be defined inline as well.
const ref = updateApplicationRef({ id: ..., data: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateApplicationRef(dataConnect, updateApplicationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.application_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.application_update);
});
```

