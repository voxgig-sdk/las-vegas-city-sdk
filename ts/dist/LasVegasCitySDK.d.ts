import { CityInfoEntity } from './entity/CityInfoEntity';
import { CouncilEntity } from './entity/CouncilEntity';
import { DepartmentEntity } from './entity/DepartmentEntity';
import { EconomicDevelopmentEntity } from './entity/EconomicDevelopmentEntity';
import { EventEntity } from './entity/EventEntity';
import { JobEntity } from './entity/JobEntity';
import { MeetingEntity } from './entity/MeetingEntity';
import { NewEntity } from './entity/NewEntity';
import { ParkEntity } from './entity/ParkEntity';
import { PermitEntity } from './entity/PermitEntity';
import { PublicSafetyEntity } from './entity/PublicSafetyEntity';
export type * from './LasVegasCityTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LasVegasCityEntityBase } from './LasVegasCityEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LasVegasCitySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CityInfo(entopts?: Record<string, any>): CityInfoEntity;
    Council(entopts?: Record<string, any>): CouncilEntity;
    Department(entopts?: Record<string, any>): DepartmentEntity;
    EconomicDevelopment(entopts?: Record<string, any>): EconomicDevelopmentEntity;
    Event(entopts?: Record<string, any>): EventEntity;
    Job(entopts?: Record<string, any>): JobEntity;
    Meeting(entopts?: Record<string, any>): MeetingEntity;
    New(entopts?: Record<string, any>): NewEntity;
    Park(entopts?: Record<string, any>): ParkEntity;
    Permit(entopts?: Record<string, any>): PermitEntity;
    PublicSafety(entopts?: Record<string, any>): PublicSafetyEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LasVegasCitySDK;
    tester(testopts?: any, sdkopts?: any): LasVegasCitySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LasVegasCitySDK;
export { stdutil, config, BaseFeature, LasVegasCityEntityBase, LasVegasCitySDK, SDK, };
