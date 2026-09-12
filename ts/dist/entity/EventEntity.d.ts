import { LasVegasCityEntityBase } from '../LasVegasCityEntityBase';
import type { LasVegasCitySDK } from '../LasVegasCitySDK';
import type { Control } from '../types';
import type { Event, EventListMatch } from '../LasVegasCityTypes';
declare class EventEntity extends LasVegasCityEntityBase<Event> {
    constructor(client: LasVegasCitySDK, entopts: any);
    make(this: EventEntity): EventEntity;
    list(this: any, reqmatch?: EventListMatch, ctrl?: Control): Promise<EventEntity[]>;
}
export { EventEntity };
