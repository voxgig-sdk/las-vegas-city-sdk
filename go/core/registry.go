package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCityInfoEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewCouncilEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewDepartmentEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewEconomicDevelopmentEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewEventEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewJobEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewMeetingEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewNewEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewParkEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewPermitEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

var NewPublicSafetyEntityFunc func(client *LasVegasCitySDK, entopts map[string]any) LasVegasCityEntity

