import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Park, ParkListMatch } from '../LasVegasCityTypes';
declare class ParkEntity extends LasVegasCityEntityBase<Park> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: ParkEntity): ParkEntity;
    list(this: any, reqmatch?: ParkListMatch, ctrl?: Control): Promise<ParkEntity[]>;
}
export { ParkEntity };
