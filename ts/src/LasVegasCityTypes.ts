// Typed models for the LasVegasCity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CityInfo {
  address?: string
  annualVisitors?: number
  established?: number
  name?: string
  numberOfParks?: number
  phone?: string
  squareMiles?: number
}

export interface CityInfoLoadMatch {
  address?: string
  annualVisitors?: number
  established?: number
  name?: string
  numberOfParks?: number
  phone?: string
  squareMiles?: number
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
  services?: any[]
  url?: string
}

export interface DepartmentListMatch {
  contact?: Record<string, any>
  description?: string
  id?: string
  name?: string
  services?: any[]
  url?: string
}

export interface EconomicDevelopment {
  industries?: any[]
  initiatives?: any[]
  resources?: any[]
}

export interface EconomicDevelopmentListMatch {
  industries?: any[]
  initiatives?: any[]
  resources?: any[]
}

export interface Event {
  category?: string
  description?: string
  endDate?: string
  id?: string
  isFree?: boolean
  location?: string
  startDate?: string
  ticketUrl?: string
  title?: string
}

export interface EventListMatch {
  category?: string
  description?: string
  endDate?: string
  id?: string
  isFree?: boolean
  location?: string
  startDate?: string
  ticketUrl?: string
  title?: string
}

export interface Job {
  applicationUrl?: string
  category?: string
  closeDate?: string
  department?: string
  description?: string
  id?: string
  postDate?: string
  requirements?: any[]
  salaryRange?: Record<string, any>
  title?: string
}

export interface JobListMatch {
  applicationUrl?: string
  category?: string
  closeDate?: string
  department?: string
  description?: string
  id?: string
  postDate?: string
  requirements?: any[]
  salaryRange?: Record<string, any>
  title?: string
}

export interface Meeting {
  agendaUrl?: string
  date?: string
  id?: string
  location?: string
  minutesUrl?: string
  status?: string
  title?: string
  type?: string
}

export interface MeetingListMatch {
  agendaUrl?: string
  date?: string
  id?: string
  location?: string
  minutesUrl?: string
  status?: string
  title?: string
  type?: string
}

export interface New {
  author?: string
  category?: string
  content?: string
  id?: string
  publishDate?: string
  summary?: string
  title?: string
  url?: string
}

export interface NewListMatch {
  author?: string
  category?: string
  content?: string
  id?: string
  publishDate?: string
  summary?: string
  title?: string
  url?: string
}

export interface Park {
  address?: string
  amenities?: any[]
  hours?: Record<string, any>
  id?: string
  name?: string
  phone?: string
  type?: string
}

export interface ParkListMatch {
  address?: string
  amenities?: any[]
  hours?: Record<string, any>
  id?: string
  name?: string
  phone?: string
  type?: string
}

export interface Permit {
  applicationUrl?: string
  description?: string
  fee?: number
  id?: string
  name?: string
  processingTime?: string
  requirements?: any[]
  type?: string
}

export interface PermitListMatch {
  applicationUrl?: string
  description?: string
  fee?: number
  id?: string
  name?: string
  processingTime?: string
  requirements?: any[]
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

