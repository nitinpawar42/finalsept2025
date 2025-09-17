import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ApplicationStatus_Key {
  id: UUIDString;
  __typename?: 'ApplicationStatus_Key';
}

export interface ApplicationType_Key {
  id: UUIDString;
  __typename?: 'ApplicationType_Key';
}

export interface Application_Key {
  id: UUIDString;
  __typename?: 'Application_Key';
}

export interface Attachment_Key {
  id: UUIDString;
  __typename?: 'Attachment_Key';
}

export interface CreateApplicationData {
  application_insert: Application_Key;
}

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

export interface GetApplicationVariables {
  id: UUIDString;
}

export interface ImportantDate_Key {
  id: UUIDString;
  __typename?: 'ImportantDate_Key';
}

export interface ListApplicationsData {
  applications: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    organization: string;
    submissionDeadline: TimestampString;
  } & Application_Key)[];
}

export interface UpdateApplicationData {
  application_update?: Application_Key | null;
}

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

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateApplicationVariables): MutationRef<CreateApplicationData, CreateApplicationVariables>;
  operationName: string;
}
export const createApplicationRef: CreateApplicationRef;

export function createApplication(vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;
export function createApplication(dc: DataConnect, vars: CreateApplicationVariables): MutationPromise<CreateApplicationData, CreateApplicationVariables>;

interface GetApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetApplicationVariables): QueryRef<GetApplicationData, GetApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetApplicationVariables): QueryRef<GetApplicationData, GetApplicationVariables>;
  operationName: string;
}
export const getApplicationRef: GetApplicationRef;

export function getApplication(vars: GetApplicationVariables): QueryPromise<GetApplicationData, GetApplicationVariables>;
export function getApplication(dc: DataConnect, vars: GetApplicationVariables): QueryPromise<GetApplicationData, GetApplicationVariables>;

interface ListApplicationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListApplicationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListApplicationsData, undefined>;
  operationName: string;
}
export const listApplicationsRef: ListApplicationsRef;

export function listApplications(): QueryPromise<ListApplicationsData, undefined>;
export function listApplications(dc: DataConnect): QueryPromise<ListApplicationsData, undefined>;

interface UpdateApplicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateApplicationVariables): MutationRef<UpdateApplicationData, UpdateApplicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateApplicationVariables): MutationRef<UpdateApplicationData, UpdateApplicationVariables>;
  operationName: string;
}
export const updateApplicationRef: UpdateApplicationRef;

export function updateApplication(vars: UpdateApplicationVariables): MutationPromise<UpdateApplicationData, UpdateApplicationVariables>;
export function updateApplication(dc: DataConnect, vars: UpdateApplicationVariables): MutationPromise<UpdateApplicationData, UpdateApplicationVariables>;

