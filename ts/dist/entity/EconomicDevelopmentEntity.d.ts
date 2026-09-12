import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { EconomicDevelopment, EconomicDevelopmentListMatch } from '../LasVegasCityTypes';
declare class EconomicDevelopmentEntity extends LasVegasCityEntityBase<EconomicDevelopment> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: EconomicDevelopmentEntity): EconomicDevelopmentEntity;
    list(this: any, reqmatch?: EconomicDevelopmentListMatch, ctrl?: Control): Promise<EconomicDevelopmentEntity[]>;
}
export { EconomicDevelopmentEntity };
