import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Meeting, MeetingListMatch } from '../LasVegasCityTypes';
declare class MeetingEntity extends LasVegasCityEntityBase<Meeting> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: MeetingEntity): MeetingEntity;
    list(this: any, reqmatch?: MeetingListMatch, ctrl?: Control): Promise<MeetingEntity[]>;
}
export { MeetingEntity };
