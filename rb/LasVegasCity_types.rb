# frozen_string_literal: true

# Typed models for the LasVegasCity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CityInfo entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] annualVisitors
#   @return [Float, nil]
#
# @!attribute [rw] established
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] numberOfParks
#   @return [Integer, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] squareMiles
#   @return [Float, nil]
CityInfo = Struct.new(
  :address,
  :annualVisitors,
  :established,
  :name,
  :numberOfParks,
  :phone,
  :squareMiles,
  keyword_init: true
)

# Request payload for CityInfo#load.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] annualVisitors
#   @return [Float, nil]
#
# @!attribute [rw] established
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] numberOfParks
#   @return [Integer, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] squareMiles
#   @return [Float, nil]
CityInfoLoadMatch = Struct.new(
  :address,
  :annualVisitors,
  :established,
  :name,
  :numberOfParks,
  :phone,
  :squareMiles,
  keyword_init: true
)

# Council entity data model.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] ward
#   @return [String, nil]
Council = Struct.new(
  :bio,
  :email,
  :id,
  :name,
  :phone,
  :title,
  :ward,
  keyword_init: true
)

# Request payload for Council#list.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] ward
#   @return [String, nil]
CouncilListMatch = Struct.new(
  :bio,
  :email,
  :id,
  :name,
  :phone,
  :title,
  :ward,
  keyword_init: true
)

# Department entity data model.
#
# @!attribute [rw] contact
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] services
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Department = Struct.new(
  :contact,
  :description,
  :id,
  :name,
  :services,
  :url,
  keyword_init: true
)

# Request payload for Department#list.
#
# @!attribute [rw] contact
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] services
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DepartmentListMatch = Struct.new(
  :contact,
  :description,
  :id,
  :name,
  :services,
  :url,
  keyword_init: true
)

# EconomicDevelopment entity data model.
#
# @!attribute [rw] industries
#   @return [Array, nil]
#
# @!attribute [rw] initiatives
#   @return [Array, nil]
#
# @!attribute [rw] resources
#   @return [Array, nil]
EconomicDevelopment = Struct.new(
  :industries,
  :initiatives,
  :resources,
  keyword_init: true
)

# Request payload for EconomicDevelopment#list.
#
# @!attribute [rw] industries
#   @return [Array, nil]
#
# @!attribute [rw] initiatives
#   @return [Array, nil]
#
# @!attribute [rw] resources
#   @return [Array, nil]
EconomicDevelopmentListMatch = Struct.new(
  :industries,
  :initiatives,
  :resources,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isFree
#   @return [Boolean, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] startDate
#   @return [String, nil]
#
# @!attribute [rw] ticketUrl
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Event = Struct.new(
  :category,
  :description,
  :endDate,
  :id,
  :isFree,
  :location,
  :startDate,
  :ticketUrl,
  :title,
  keyword_init: true
)

# Request payload for Event#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
EventListMatch = Struct.new(
  :category,
  :end_date,
  :start_date,
  keyword_init: true
)

# Job entity data model.
#
# @!attribute [rw] applicationUrl
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] closeDate
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] postDate
#   @return [String, nil]
#
# @!attribute [rw] requirements
#   @return [Array, nil]
#
# @!attribute [rw] salaryRange
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Job = Struct.new(
  :applicationUrl,
  :category,
  :closeDate,
  :department,
  :description,
  :id,
  :postDate,
  :requirements,
  :salaryRange,
  :title,
  keyword_init: true
)

# Request payload for Job#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
JobListMatch = Struct.new(
  :category,
  :department,
  keyword_init: true
)

# Meeting entity data model.
#
# @!attribute [rw] agendaUrl
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] minutesUrl
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Meeting = Struct.new(
  :agendaUrl,
  :date,
  :id,
  :location,
  :minutesUrl,
  :status,
  :title,
  :type,
  keyword_init: true
)

# Request payload for Meeting#list.
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
MeetingListMatch = Struct.new(
  :start_date,
  :type,
  keyword_init: true
)

# New entity data model.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] publishDate
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
New = Struct.new(
  :author,
  :category,
  :content,
  :id,
  :publishDate,
  :summary,
  :title,
  :url,
  keyword_init: true
)

# Request payload for New#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
NewListMatch = Struct.new(
  :category,
  :limit,
  keyword_init: true
)

# Park entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] amenities
#   @return [Array, nil]
#
# @!attribute [rw] hours
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Park = Struct.new(
  :address,
  :amenities,
  :hours,
  :id,
  :name,
  :phone,
  :type,
  keyword_init: true
)

# Request payload for Park#list.
#
# @!attribute [rw] amenity
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
ParkListMatch = Struct.new(
  :amenity,
  :location,
  keyword_init: true
)

# Permit entity data model.
#
# @!attribute [rw] applicationUrl
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] fee
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] processingTime
#   @return [String, nil]
#
# @!attribute [rw] requirements
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Permit = Struct.new(
  :applicationUrl,
  :description,
  :fee,
  :id,
  :name,
  :processingTime,
  :requirements,
  :type,
  keyword_init: true
)

# Request payload for Permit#list.
#
# @!attribute [rw] type
#   @return [String, nil]
PermitListMatch = Struct.new(
  :type,
  keyword_init: true
)

# PublicSafety entity data model.
#
# @!attribute [rw] fire
#   @return [Hash, nil]
#
# @!attribute [rw] medical
#   @return [Hash, nil]
#
# @!attribute [rw] police
#   @return [Hash, nil]
PublicSafety = Struct.new(
  :fire,
  :medical,
  :police,
  keyword_init: true
)

# Request payload for PublicSafety#load.
#
# @!attribute [rw] fire
#   @return [Hash, nil]
#
# @!attribute [rw] medical
#   @return [Hash, nil]
#
# @!attribute [rw] police
#   @return [Hash, nil]
PublicSafetyLoadMatch = Struct.new(
  :fire,
  :medical,
  :police,
  keyword_init: true
)

