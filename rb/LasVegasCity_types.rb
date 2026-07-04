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
# @!attribute [rw] annual_visitor
#   @return [Float, nil]
#
# @!attribute [rw] established
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] number_of_park
#   @return [Integer, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] square_mile
#   @return [Float, nil]
CityInfo = Struct.new(
  :address,
  :annual_visitor,
  :established,
  :name,
  :number_of_park,
  :phone,
  :square_mile,
  keyword_init: true
)

# Match filter for CityInfo#load (any subset of CityInfo fields).
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] annual_visitor
#   @return [Float, nil]
#
# @!attribute [rw] established
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] number_of_park
#   @return [Integer, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] square_mile
#   @return [Float, nil]
CityInfoLoadMatch = Struct.new(
  :address,
  :annual_visitor,
  :established,
  :name,
  :number_of_park,
  :phone,
  :square_mile,
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

# Match filter for Council#list (any subset of Council fields).
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
# @!attribute [rw] service
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Department = Struct.new(
  :contact,
  :description,
  :id,
  :name,
  :service,
  :url,
  keyword_init: true
)

# Match filter for Department#list (any subset of Department fields).
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
# @!attribute [rw] service
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DepartmentListMatch = Struct.new(
  :contact,
  :description,
  :id,
  :name,
  :service,
  :url,
  keyword_init: true
)

# EconomicDevelopment entity data model.
#
# @!attribute [rw] industry
#   @return [Array, nil]
#
# @!attribute [rw] initiatif
#   @return [Array, nil]
#
# @!attribute [rw] resource
#   @return [Array, nil]
EconomicDevelopment = Struct.new(
  :industry,
  :initiatif,
  :resource,
  keyword_init: true
)

# Match filter for EconomicDevelopment#list (any subset of EconomicDevelopment fields).
#
# @!attribute [rw] industry
#   @return [Array, nil]
#
# @!attribute [rw] initiatif
#   @return [Array, nil]
#
# @!attribute [rw] resource
#   @return [Array, nil]
EconomicDevelopmentListMatch = Struct.new(
  :industry,
  :initiatif,
  :resource,
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
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_free
#   @return [Boolean, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] ticket_url
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Event = Struct.new(
  :category,
  :description,
  :end_date,
  :id,
  :is_free,
  :location,
  :start_date,
  :ticket_url,
  :title,
  keyword_init: true
)

# Match filter for Event#list (any subset of Event fields).
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_free
#   @return [Boolean, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] ticket_url
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
EventListMatch = Struct.new(
  :category,
  :description,
  :end_date,
  :id,
  :is_free,
  :location,
  :start_date,
  :ticket_url,
  :title,
  keyword_init: true
)

# Job entity data model.
#
# @!attribute [rw] application_url
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] close_date
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
# @!attribute [rw] post_date
#   @return [String, nil]
#
# @!attribute [rw] requirement
#   @return [Array, nil]
#
# @!attribute [rw] salary_range
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Job = Struct.new(
  :application_url,
  :category,
  :close_date,
  :department,
  :description,
  :id,
  :post_date,
  :requirement,
  :salary_range,
  :title,
  keyword_init: true
)

# Match filter for Job#list (any subset of Job fields).
#
# @!attribute [rw] application_url
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] close_date
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
# @!attribute [rw] post_date
#   @return [String, nil]
#
# @!attribute [rw] requirement
#   @return [Array, nil]
#
# @!attribute [rw] salary_range
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
JobListMatch = Struct.new(
  :application_url,
  :category,
  :close_date,
  :department,
  :description,
  :id,
  :post_date,
  :requirement,
  :salary_range,
  :title,
  keyword_init: true
)

# Meeting entity data model.
#
# @!attribute [rw] agenda_url
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
# @!attribute [rw] minutes_url
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
  :agenda_url,
  :date,
  :id,
  :location,
  :minutes_url,
  :status,
  :title,
  :type,
  keyword_init: true
)

# Match filter for Meeting#list (any subset of Meeting fields).
#
# @!attribute [rw] agenda_url
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
# @!attribute [rw] minutes_url
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
MeetingListMatch = Struct.new(
  :agenda_url,
  :date,
  :id,
  :location,
  :minutes_url,
  :status,
  :title,
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
# @!attribute [rw] publish_date
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
  :publish_date,
  :summary,
  :title,
  :url,
  keyword_init: true
)

# Match filter for New#list (any subset of New fields).
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
# @!attribute [rw] publish_date
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
NewListMatch = Struct.new(
  :author,
  :category,
  :content,
  :id,
  :publish_date,
  :summary,
  :title,
  :url,
  keyword_init: true
)

# Park entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] amenity
#   @return [Array, nil]
#
# @!attribute [rw] hour
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
  :amenity,
  :hour,
  :id,
  :name,
  :phone,
  :type,
  keyword_init: true
)

# Match filter for Park#list (any subset of Park fields).
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] amenity
#   @return [Array, nil]
#
# @!attribute [rw] hour
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
ParkListMatch = Struct.new(
  :address,
  :amenity,
  :hour,
  :id,
  :name,
  :phone,
  :type,
  keyword_init: true
)

# Permit entity data model.
#
# @!attribute [rw] application_url
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
# @!attribute [rw] processing_time
#   @return [String, nil]
#
# @!attribute [rw] requirement
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Permit = Struct.new(
  :application_url,
  :description,
  :fee,
  :id,
  :name,
  :processing_time,
  :requirement,
  :type,
  keyword_init: true
)

# Match filter for Permit#list (any subset of Permit fields).
#
# @!attribute [rw] application_url
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
# @!attribute [rw] processing_time
#   @return [String, nil]
#
# @!attribute [rw] requirement
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
PermitListMatch = Struct.new(
  :application_url,
  :description,
  :fee,
  :id,
  :name,
  :processing_time,
  :requirement,
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

# Match filter for PublicSafety#load (any subset of PublicSafety fields).
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

