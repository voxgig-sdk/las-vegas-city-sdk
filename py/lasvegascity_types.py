# Typed models for the LasVegasCity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CityInfo(TypedDict, total=False):
    address: str
    annual_visitor: float
    established: int
    name: str
    number_of_park: int
    phone: str
    square_mile: float


class CityInfoLoadMatch(TypedDict, total=False):
    address: str
    annual_visitor: float
    established: int
    name: str
    number_of_park: int
    phone: str
    square_mile: float


class Council(TypedDict, total=False):
    bio: str
    email: str
    id: str
    name: str
    phone: str
    title: str
    ward: str


class CouncilListMatch(TypedDict, total=False):
    bio: str
    email: str
    id: str
    name: str
    phone: str
    title: str
    ward: str


class Department(TypedDict, total=False):
    contact: dict
    description: str
    id: str
    name: str
    service: list
    url: str


class DepartmentListMatch(TypedDict, total=False):
    contact: dict
    description: str
    id: str
    name: str
    service: list
    url: str


class EconomicDevelopment(TypedDict, total=False):
    industry: list
    initiatif: list
    resource: list


class EconomicDevelopmentListMatch(TypedDict, total=False):
    industry: list
    initiatif: list
    resource: list


class Event(TypedDict, total=False):
    category: str
    description: str
    end_date: str
    id: str
    is_free: bool
    location: str
    start_date: str
    ticket_url: str
    title: str


class EventListMatch(TypedDict, total=False):
    category: str
    description: str
    end_date: str
    id: str
    is_free: bool
    location: str
    start_date: str
    ticket_url: str
    title: str


class Job(TypedDict, total=False):
    application_url: str
    category: str
    close_date: str
    department: str
    description: str
    id: str
    post_date: str
    requirement: list
    salary_range: dict
    title: str


class JobListMatch(TypedDict, total=False):
    application_url: str
    category: str
    close_date: str
    department: str
    description: str
    id: str
    post_date: str
    requirement: list
    salary_range: dict
    title: str


class Meeting(TypedDict, total=False):
    agenda_url: str
    date: str
    id: str
    location: str
    minutes_url: str
    status: str
    title: str
    type: str


class MeetingListMatch(TypedDict, total=False):
    agenda_url: str
    date: str
    id: str
    location: str
    minutes_url: str
    status: str
    title: str
    type: str


class New(TypedDict, total=False):
    author: str
    category: str
    content: str
    id: str
    publish_date: str
    summary: str
    title: str
    url: str


class NewListMatch(TypedDict, total=False):
    author: str
    category: str
    content: str
    id: str
    publish_date: str
    summary: str
    title: str
    url: str


class Park(TypedDict, total=False):
    address: str
    amenity: list
    hour: dict
    id: str
    name: str
    phone: str
    type: str


class ParkListMatch(TypedDict, total=False):
    address: str
    amenity: list
    hour: dict
    id: str
    name: str
    phone: str
    type: str


class Permit(TypedDict, total=False):
    application_url: str
    description: str
    fee: float
    id: str
    name: str
    processing_time: str
    requirement: list
    type: str


class PermitListMatch(TypedDict, total=False):
    application_url: str
    description: str
    fee: float
    id: str
    name: str
    processing_time: str
    requirement: list
    type: str


class PublicSafety(TypedDict, total=False):
    fire: dict
    medical: dict
    police: dict


class PublicSafetyLoadMatch(TypedDict, total=False):
    fire: dict
    medical: dict
    police: dict
