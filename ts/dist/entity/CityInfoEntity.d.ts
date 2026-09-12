import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { CityInfo, CityInfoLoadMatch } from '../LasVegasCityTypes';
declare class CityInfoEntity extends LasVegasCityEntityBase<CityInfo> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: CityInfoEntity): CityInfoEntity;
    load(this: any, reqmatch?: CityInfoLoadMatch, ctrl?: Control): Promise<CityInfoEntity>;
}
export { CityInfoEntity };
