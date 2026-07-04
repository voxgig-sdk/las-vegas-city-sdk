// Typed models for the LasVegasCity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CityInfo is the typed data model for the city_info entity.
type CityInfo struct {
	Address *string `json:"address,omitempty"`
	AnnualVisitor *float64 `json:"annual_visitor,omitempty"`
	Established *int `json:"established,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfPark *int `json:"number_of_park,omitempty"`
	Phone *string `json:"phone,omitempty"`
	SquareMile *float64 `json:"square_mile,omitempty"`
}

// CityInfoLoadMatch mirrors the city_info fields as an all-optional match
// filter (Go analog of Partial<CityInfo>).
type CityInfoLoadMatch struct {
	Address *string `json:"address,omitempty"`
	AnnualVisitor *float64 `json:"annual_visitor,omitempty"`
	Established *int `json:"established,omitempty"`
	Name *string `json:"name,omitempty"`
	NumberOfPark *int `json:"number_of_park,omitempty"`
	Phone *string `json:"phone,omitempty"`
	SquareMile *float64 `json:"square_mile,omitempty"`
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

// CouncilListMatch mirrors the council fields as an all-optional match
// filter (Go analog of Partial<Council>).
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
	Service *[]any `json:"service,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DepartmentListMatch mirrors the department fields as an all-optional match
// filter (Go analog of Partial<Department>).
type DepartmentListMatch struct {
	Contact *map[string]any `json:"contact,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Service *[]any `json:"service,omitempty"`
	Url *string `json:"url,omitempty"`
}

// EconomicDevelopment is the typed data model for the economic_development entity.
type EconomicDevelopment struct {
	Industry *[]any `json:"industry,omitempty"`
	Initiatif *[]any `json:"initiatif,omitempty"`
	Resource *[]any `json:"resource,omitempty"`
}

// EconomicDevelopmentListMatch mirrors the economic_development fields as an all-optional match
// filter (Go analog of Partial<EconomicDevelopment>).
type EconomicDevelopmentListMatch struct {
	Industry *[]any `json:"industry,omitempty"`
	Initiatif *[]any `json:"initiatif,omitempty"`
	Resource *[]any `json:"resource,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Id *string `json:"id,omitempty"`
	IsFree *bool `json:"is_free,omitempty"`
	Location *string `json:"location,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	TicketUrl *string `json:"ticket_url,omitempty"`
	Title *string `json:"title,omitempty"`
}

// EventListMatch mirrors the event fields as an all-optional match
// filter (Go analog of Partial<Event>).
type EventListMatch struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Id *string `json:"id,omitempty"`
	IsFree *bool `json:"is_free,omitempty"`
	Location *string `json:"location,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	TicketUrl *string `json:"ticket_url,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Job is the typed data model for the job entity.
type Job struct {
	ApplicationUrl *string `json:"application_url,omitempty"`
	Category *string `json:"category,omitempty"`
	CloseDate *string `json:"close_date,omitempty"`
	Department *string `json:"department,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	PostDate *string `json:"post_date,omitempty"`
	Requirement *[]any `json:"requirement,omitempty"`
	SalaryRange *map[string]any `json:"salary_range,omitempty"`
	Title *string `json:"title,omitempty"`
}

// JobListMatch mirrors the job fields as an all-optional match
// filter (Go analog of Partial<Job>).
type JobListMatch struct {
	ApplicationUrl *string `json:"application_url,omitempty"`
	Category *string `json:"category,omitempty"`
	CloseDate *string `json:"close_date,omitempty"`
	Department *string `json:"department,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	PostDate *string `json:"post_date,omitempty"`
	Requirement *[]any `json:"requirement,omitempty"`
	SalaryRange *map[string]any `json:"salary_range,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Meeting is the typed data model for the meeting entity.
type Meeting struct {
	AgendaUrl *string `json:"agenda_url,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	MinutesUrl *string `json:"minutes_url,omitempty"`
	Status *string `json:"status,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// MeetingListMatch mirrors the meeting fields as an all-optional match
// filter (Go analog of Partial<Meeting>).
type MeetingListMatch struct {
	AgendaUrl *string `json:"agenda_url,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	MinutesUrl *string `json:"minutes_url,omitempty"`
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
	PublishDate *string `json:"publish_date,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// NewListMatch mirrors the new fields as an all-optional match
// filter (Go analog of Partial<New>).
type NewListMatch struct {
	Author *string `json:"author,omitempty"`
	Category *string `json:"category,omitempty"`
	Content *string `json:"content,omitempty"`
	Id *string `json:"id,omitempty"`
	PublishDate *string `json:"publish_date,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Park is the typed data model for the park entity.
type Park struct {
	Address *string `json:"address,omitempty"`
	Amenity *[]any `json:"amenity,omitempty"`
	Hour *map[string]any `json:"hour,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ParkListMatch mirrors the park fields as an all-optional match
// filter (Go analog of Partial<Park>).
type ParkListMatch struct {
	Address *string `json:"address,omitempty"`
	Amenity *[]any `json:"amenity,omitempty"`
	Hour *map[string]any `json:"hour,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Permit is the typed data model for the permit entity.
type Permit struct {
	ApplicationUrl *string `json:"application_url,omitempty"`
	Description *string `json:"description,omitempty"`
	Fee *float64 `json:"fee,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProcessingTime *string `json:"processing_time,omitempty"`
	Requirement *[]any `json:"requirement,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PermitListMatch mirrors the permit fields as an all-optional match
// filter (Go analog of Partial<Permit>).
type PermitListMatch struct {
	ApplicationUrl *string `json:"application_url,omitempty"`
	Description *string `json:"description,omitempty"`
	Fee *float64 `json:"fee,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ProcessingTime *string `json:"processing_time,omitempty"`
	Requirement *[]any `json:"requirement,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PublicSafety is the typed data model for the public_safety entity.
type PublicSafety struct {
	Fire *map[string]any `json:"fire,omitempty"`
	Medical *map[string]any `json:"medical,omitempty"`
	Police *map[string]any `json:"police,omitempty"`
}

// PublicSafetyLoadMatch mirrors the public_safety fields as an all-optional match
// filter (Go analog of Partial<PublicSafety>).
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
