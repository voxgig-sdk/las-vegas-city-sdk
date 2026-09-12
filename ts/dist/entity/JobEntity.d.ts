import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Job, JobListMatch } from '../LasVegasCityTypes';
declare class JobEntity extends LasVegasCityEntityBase<Job> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: JobEntity): JobEntity;
    list(this: any, reqmatch?: JobListMatch, ctrl?: Control): Promise<JobEntity[]>;
}
export { JobEntity };
