-- Typed models for the LasVegasCity SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CityInfo
---@field address? string
---@field annualVisitors? number
---@field established? number
---@field name? string
---@field numberOfParks? number
---@field phone? string
---@field squareMiles? number

---@class CityInfoLoadMatch
---@field address? string
---@field annualVisitors? number
---@field established? number
---@field name? string
---@field numberOfParks? number
---@field phone? string
---@field squareMiles? number

---@class Council
---@field bio? string
---@field email? string
---@field id? string
---@field name? string
---@field phone? string
---@field title? string
---@field ward? string

---@class CouncilListMatch
---@field bio? string
---@field email? string
---@field id? string
---@field name? string
---@field phone? string
---@field title? string
---@field ward? string

---@class Department
---@field contact? table
---@field description? string
---@field id? string
---@field name? string
---@field services? table
---@field url? string

---@class DepartmentListMatch
---@field contact? table
---@field description? string
---@field id? string
---@field name? string
---@field services? table
---@field url? string

---@class EconomicDevelopment
---@field industries? table
---@field initiatives? table
---@field resources? table

---@class EconomicDevelopmentListMatch
---@field industries? table
---@field initiatives? table
---@field resources? table

---@class Event
---@field category? string
---@field description? string
---@field endDate? string
---@field id? string
---@field isFree? boolean
---@field location? string
---@field startDate? string
---@field ticketUrl? string
---@field title? string

---@class EventListMatch
---@field category? string
---@field end_date? string
---@field start_date? string

---@class Job
---@field applicationUrl? string
---@field category? string
---@field closeDate? string
---@field department? string
---@field description? string
---@field id? string
---@field postDate? string
---@field requirements? table
---@field salaryRange? table
---@field title? string

---@class JobListMatch
---@field category? string
---@field department? string

---@class Meeting
---@field agendaUrl? string
---@field date? string
---@field id? string
---@field location? string
---@field minutesUrl? string
---@field status? string
---@field title? string
---@field type? string

---@class MeetingListMatch
---@field start_date? string
---@field type? string

---@class New
---@field author? string
---@field category? string
---@field content? string
---@field id? string
---@field publishDate? string
---@field summary? string
---@field title? string
---@field url? string

---@class NewListMatch
---@field category? string
---@field limit? number

---@class Park
---@field address? string
---@field amenities? table
---@field hours? table
---@field id? string
---@field name? string
---@field phone? string
---@field type? string

---@class ParkListMatch
---@field amenity? string
---@field location? string

---@class Permit
---@field applicationUrl? string
---@field description? string
---@field fee? number
---@field id? string
---@field name? string
---@field processingTime? string
---@field requirements? table
---@field type? string

---@class PermitListMatch
---@field type? string

---@class PublicSafety
---@field fire? table
---@field medical? table
---@field police? table

---@class PublicSafetyLoadMatch
---@field fire? table
---@field medical? table
---@field police? table

local M = {}

return M
