// Typed models for the LasVegasCity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CityInfo {
  address?: string
  annual_visitor?: number
  established?: number
  name?: string
  number_of_park?: number
  phone?: string
  square_mile?: number
}

export interface CityInfoLoadMatch {
  address?: string
  annual_visitor?: number
  established?: number
  name?: string
  number_of_park?: number
  phone?: string
  square_mile?: number
}

export interface Council {
  bio?: string
  email?: string
  id?: string
  name?: string
  phone?: string
  title?: string
  ward?: string
}

export interface CouncilListMatch {
  bio?: string
  email?: string
  id?: string
  name?: string
  phone?: string
  title?: string
  ward?: string
}

export interface Department {
  contact?: Record<string, any>
  description?: string
  id?: string
  name?: string
  service?: any[]
  url?: string
}

export interface DepartmentListMatch {
  contact?: Record<string, any>
  description?: string
  id?: string
  name?: string
  service?: any[]
  url?: string
}

export interface EconomicDevelopment {
  industry?: any[]
  initiatif?: any[]
  resource?: any[]
}

export interface EconomicDevelopmentListMatch {
  industry?: any[]
  initiatif?: any[]
  resource?: any[]
}

export interface Event {
  category?: string
  description?: string
  end_date?: string
  id?: string
  is_free?: boolean
  location?: string
  start_date?: string
  ticket_url?: string
  title?: string
}

export interface EventListMatch {
  category?: string
  description?: string
  end_date?: string
  id?: string
  is_free?: boolean
  location?: string
  start_date?: string
  ticket_url?: string
  title?: string
}

export interface Job {
  application_url?: string
  category?: string
  close_date?: string
  department?: string
  description?: string
  id?: string
  post_date?: string
  requirement?: any[]
  salary_range?: Record<string, any>
  title?: string
}

export interface JobListMatch {
  application_url?: string
  category?: string
  close_date?: string
  department?: string
  description?: string
  id?: string
  post_date?: string
  requirement?: any[]
  salary_range?: Record<string, any>
  title?: string
}

export interface Meeting {
  agenda_url?: string
  date?: string
  id?: string
  location?: string
  minutes_url?: string
  status?: string
  title?: string
  type?: string
}

export interface MeetingListMatch {
  agenda_url?: string
  date?: string
  id?: string
  location?: string
  minutes_url?: string
  status?: string
  title?: string
  type?: string
}

export interface New {
  author?: string
  category?: string
  content?: string
  id?: string
  publish_date?: string
  summary?: string
  title?: string
  url?: string
}

export interface NewListMatch {
  author?: string
  category?: string
  content?: string
  id?: string
  publish_date?: string
  summary?: string
  title?: string
  url?: string
}

export interface Park {
  address?: string
  amenity?: any[]
  hour?: Record<string, any>
  id?: string
  name?: string
  phone?: string
  type?: string
}

export interface ParkListMatch {
  address?: string
  amenity?: any[]
  hour?: Record<string, any>
  id?: string
  name?: string
  phone?: string
  type?: string
}

export interface Permit {
  application_url?: string
  description?: string
  fee?: number
  id?: string
  name?: string
  processing_time?: string
  requirement?: any[]
  type?: string
}

export interface PermitListMatch {
  application_url?: string
  description?: string
  fee?: number
  id?: string
  name?: string
  processing_time?: string
  requirement?: any[]
  type?: string
}

export interface PublicSafety {
  fire?: Record<string, any>
  medical?: Record<string, any>
  police?: Record<string, any>
}

export interface PublicSafetyLoadMatch {
  fire?: Record<string, any>
  medical?: Record<string, any>
  police?: Record<string, any>
}

