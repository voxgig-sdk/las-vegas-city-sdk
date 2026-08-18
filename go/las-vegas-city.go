package voxgiglasvegascitysdk

import (
	"github.com/voxgig-sdk/las-vegas-city-sdk/go/core"
	"github.com/voxgig-sdk/las-vegas-city-sdk/go/entity"
	"github.com/voxgig-sdk/las-vegas-city-sdk/go/feature"
	_ "github.com/voxgig-sdk/las-vegas-city-sdk/go/utility"
)

// Type aliases preserve external API.
type LasVegasCitySDK = core.LasVegasCitySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LasVegasCityEntity = core.LasVegasCityEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LasVegasCityError = core.LasVegasCityError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCityInfoEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewCityInfoEntity(client, entopts)
	}
	core.NewCouncilEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewCouncilEntity(client, entopts)
	}
	core.NewDepartmentEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewDepartmentEntity(client, entopts)
	}
	core.NewEconomicDevelopmentEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewEconomicDevelopmentEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewJobEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewJobEntity(client, entopts)
	}
	core.NewMeetingEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewMeetingEntity(client, entopts)
	}
	core.NewNewEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewNewEntity(client, entopts)
	}
	core.NewParkEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewParkEntity(client, entopts)
	}
	core.NewPermitEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewPermitEntity(client, entopts)
	}
	core.NewPublicSafetyEntityFunc = func(client *core.LasVegasCitySDK, entopts map[string]any) core.LasVegasCityEntity {
		return entity.NewPublicSafetyEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLasVegasCitySDK = core.NewLasVegasCitySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLasVegasCitySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LasVegasCitySDK  { return NewLasVegasCitySDK(nil) }
func Test() *LasVegasCitySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
