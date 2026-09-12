import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Department, DepartmentListMatch } from '../LasVegasCityTypes';
declare class DepartmentEntity extends LasVegasCityEntityBase<Department> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: DepartmentEntity): DepartmentEntity;
    list(this: any, reqmatch?: DepartmentListMatch, ctrl?: Control): Promise<DepartmentEntity[]>;
}
export { DepartmentEntity };
