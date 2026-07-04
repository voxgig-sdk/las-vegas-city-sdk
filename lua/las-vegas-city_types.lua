-- Typed models for the LasVegasCity SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CityInfo
---@field address? string
---@field annual_visitor? number
---@field established? number
---@field name? string
---@field number_of_park? number
---@field phone? string
---@field square_mile? number

---@class CityInfoLoadMatch

---@class Council
---@field bio? string
---@field email? string
---@field id? string
---@field name? string
---@field phone? string
---@field title? string
---@field ward? string

---@class CouncilListMatch

---@class Department
---@field contact? table
---@field description? string
---@field id? string
---@field name? string
---@field service? table
---@field url? string

---@class DepartmentListMatch

---@class EconomicDevelopment
---@field industry? table
---@field initiatif? table
---@field resource? table

---@class EconomicDevelopmentListMatch

---@class Event
---@field category? string
---@field description? string
---@field end_date? string
---@field id? string
---@field is_free? boolean
---@field location? string
---@field start_date? string
---@field ticket_url? string
---@field title? string

---@class EventListMatch

---@class Job
---@field application_url? string
---@field category? string
---@field close_date? string
---@field department? string
---@field description? string
---@field id? string
---@field post_date? string
---@field requirement? table
---@field salary_range? table
---@field title? string

---@class JobListMatch

---@class Meeting
---@field agenda_url? string
---@field date? string
---@field id? string
---@field location? string
---@field minutes_url? string
---@field status? string
---@field title? string
---@field type? string

---@class MeetingListMatch

---@class New
---@field author? string
---@field category? string
---@field content? string
---@field id? string
---@field publish_date? string
---@field summary? string
---@field title? string
---@field url? string

---@class NewListMatch

---@class Park
---@field address? string
---@field amenity? table
---@field hour? table
---@field id? string
---@field name? string
---@field phone? string
---@field type? string

---@class ParkListMatch

---@class Permit
---@field application_url? string
---@field description? string
---@field fee? number
---@field id? string
---@field name? string
---@field processing_time? string
---@field requirement? table
---@field type? string

---@class PermitListMatch

---@class PublicSafety
---@field fire? table
---@field medical? table
---@field police? table

---@class PublicSafetyLoadMatch

local M = {}

return M
