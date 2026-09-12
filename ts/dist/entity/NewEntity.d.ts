import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { New, NewListMatch } from '../LasVegasCityTypes';
declare class NewEntity extends LasVegasCityEntityBase<New> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: NewEntity): NewEntity;
    list(this: any, reqmatch?: NewListMatch, ctrl?: Control): Promise<NewEntity[]>;
}
export { NewEntity };
