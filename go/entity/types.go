// Typed models for the LasVegasCity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/las-vegas-city-sdk/go/core"
)

// CityInfo is the typed data model for the city_info entity.
type CityInfo struct {
	Address *string `json:"address,omitempty"`
	AnnualVisitors *float64 `json:"annualVisitors,omitempty"`
	Established *int `json:"established,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfParks *int `json:"numberOfParks,omitempty"`
	Phone *string `json:"phone,omitempty"`
	SquareMiles *float64 `json:"squareMiles,omitempty"`
}

// CityInfoLoadMatch is the typed request payload for CityInfo.LoadTyped.
type CityInfoLoadMatch struct {
	Address *string `json:"address,omitempty"`
	AnnualVisitors *float64 `json:"annualVisitors,omitempty"`
	Established *int `json:"established,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfParks *int `json:"numberOfParks,omitempty"`
	Phone *string `json:"phone,omitempty"`
	SquareMiles *float64 `json:"squareMiles,omitempty"`
}

// Council is the typed data model for the council entity.
type Council struct {
	Bio *string `json:"bio,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Title *string `json:"title,omitempty"`
	Ward *string `json:"ward,omitempty"`
}

// CouncilListMatch is the typed request payload for Council.ListTyped.
type CouncilListMatch struct {
	Bio *string `json:"bio,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Title *string `json:"title,omitempty"`
	Ward *string `json:"ward,omitempty"`
}

// Department is the typed data model for the department entity.
type Department struct {
	Contact *map[string]any `json:"contact,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Services *[]any `json:"services,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DepartmentListMatch is the typed request payload for Department.ListTyped.
type DepartmentListMatch struct {
	Contact *map[string]any `json:"contact,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Services *[]any `json:"services,omitempty"`
	Url *string `json:"url,omitempty"`
}

// EconomicDevelopment is the typed data model for the economic_development entity.
type EconomicDevelopment struct {
	Industries *[]any `json:"industries,omitempty"`
	Initiatives *[]any `json:"initiatives,omitempty"`
	Resources *[]any `json:"resources,omitempty"`
}

// EconomicDevelopmentListMatch is the typed request payload for EconomicDevelopment.ListTyped.
type EconomicDevelopmentListMatch struct {
	Industries *[]any `json:"industries,omitempty"`
	Initiatives *[]any `json:"initiatives,omitempty"`
	Resources *[]any `json:"resources,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EndDate *string `json:"endDate,omitempty"`
	Id *string `json:"id,omitempty"`
	IsFree *bool `json:"isFree,omitempty"`
	Location *string `json:"location,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
	TicketUrl *string `json:"ticketUrl,omitempty"`
	Title *string `json:"title,omitempty"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EndDate *string `json:"endDate,omitempty"`
	Id *string `json:"id,omitempty"`
	IsFree *bool `json:"isFree,omitempty"`
	Location *string `json:"location,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
	TicketUrl *string `json:"ticketUrl,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Job is the typed data model for the job entity.
type Job struct {
	ApplicationUrl *string `json:"applicationUrl,omitempty"`
	Category *string `json:"category,omitempty"`
	CloseDate *string `json:"closeDate,omitempty"`
	Department *string `json:"department,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	PostDate *string `json:"postDate,omitempty"`
	Requirements *[]any `json:"requirements,omitempty"`
	SalaryRange *map[string]any `json:"salaryRange,omitempty"`
	Title *string `json:"title,omitempty"`
}

// JobListMatch is the typed request payload for Job.ListTyped.
type JobListMatch struct {
	ApplicationUrl *string `json:"applicationUrl,omitempty"`
	Category *string `json:"category,omitempty"`
	CloseDate *string `json:"closeDate,omitempty"`
	Department *string `json:"department,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	PostDate *string `json:"postDate,omitempty"`
	Requirements *[]any `json:"requirements,omitempty"`
	SalaryRange *map[string]any `json:"salaryRange,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Meeting is the typed data model for the meeting entity.
type Meeting struct {
	AgendaUrl *string `json:"agendaUrl,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	MinutesUrl *string `json:"minutesUrl,omitempty"`
	Status *string `json:"status,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// MeetingListMatch is the typed request payload for Meeting.ListTyped.
type MeetingListMatch struct {
	AgendaUrl *string `json:"agendaUrl,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	MinutesUrl *string `json:"minutesUrl,omitempty"`
	Status *string `json:"status,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// New is the typed data model for the new entity.
type New struct {
	Author *string `json:"author,omitempty"`
	Category *string `json:"category,omitempty"`
	Content *string `json:"content,omitempty"`
	Id *string `json:"id,omitempty"`
	PublishDate *string `json:"publishDate,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// NewListMatch is the typed request payload for New.ListTyped.
type NewListMatch struct {
	Author *string `json:"author,omitempty"`
	Category *string `json:"category,omitempty"`
	Content *string `json:"content,omitempty"`
	Id *string `json:"id,omitempty"`
	PublishDate *string `json:"publishDate,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Park is the typed data model for the park entity.
type Park struct {
	Address *string `json:"address,omitempty"`
	Amenities *[]any `json:"amenities,omitempty"`
	Hours *map[string]any `json:"hours,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ParkListMatch is the typed request payload for Park.ListTyped.
type ParkListMatch struct {
	Address *string `json:"address,omitempty"`
	Amenities *[]any `json:"amenities,omitempty"`
	Hours *map[string]any `json:"hours,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Permit is the typed data model for the permit entity.
type Permit struct {
	ApplicationUrl *string `json:"applicationUrl,omitempty"`
	Description *string `json:"description,omitempty"`
	Fee *float64 `json:"fee,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProcessingTime *string `json:"processingTime,omitempty"`
	Requirements *[]any `json:"requirements,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PermitListMatch is the typed request payload for Permit.ListTyped.
type PermitListMatch struct {
	ApplicationUrl *string `json:"applicationUrl,omitempty"`
	Description *string `json:"description,omitempty"`
	Fee *float64 `json:"fee,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProcessingTime *string `json:"processingTime,omitempty"`
	Requirements *[]any `json:"requirements,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PublicSafety is the typed data model for the public_safety entity.
type PublicSafety struct {
	Fire *map[string]any `json:"fire,omitempty"`
	Medical *map[string]any `json:"medical,omitempty"`
	Police *map[string]any `json:"police,omitempty"`
}

// PublicSafetyLoadMatch is the typed request payload for PublicSafety.LoadTyped.
type PublicSafetyLoadMatch struct {
	Fire *map[string]any `json:"fire,omitempty"`
	Medical *map[string]any `json:"medical,omitempty"`
	Police *map[string]any `json:"police,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
