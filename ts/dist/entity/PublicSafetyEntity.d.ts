import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { PublicSafety, PublicSafetyLoadMatch } from '../LasVegasCityTypes';
declare class PublicSafetyEntity extends LasVegasCityEntityBase<PublicSafety> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: PublicSafetyEntity): PublicSafetyEntity;
    load(this: any, reqmatch?: PublicSafetyLoadMatch, ctrl?: Control): Promise<PublicSafetyEntity>;
}
export { PublicSafetyEntity };
