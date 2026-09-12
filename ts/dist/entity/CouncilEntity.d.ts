import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Council, CouncilListMatch } from '../LasVegasCityTypes';
declare class CouncilEntity extends LasVegasCityEntityBase<Council> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: CouncilEntity): CouncilEntity;
    list(this: any, reqmatch?: CouncilListMatch, ctrl?: Control): Promise<CouncilEntity[]>;
}
export { CouncilEntity };
