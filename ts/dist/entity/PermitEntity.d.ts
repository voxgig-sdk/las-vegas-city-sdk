import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Permit, PermitListMatch } from '../LasVegasCityTypes';
declare class PermitEntity extends LasVegasCityEntityBase<Permit> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: PermitEntity): PermitEntity;
    list(this: any, reqmatch?: PermitListMatch, ctrl?: Control): Promise<PermitEntity[]>;
}
export { PermitEntity };
