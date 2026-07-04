# Typed models for the LasVegasCity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CityInfo:
    address: Optional[str] = None
    annual_visitor: Optional[float] = None
    established: Optional[int] = None
    name: Optional[str] = None
    number_of_park: Optional[int] = None
    phone: Optional[str] = None
    square_mile: Optional[float] = None


@dataclass
class CityInfoLoadMatch:
    address: Optional[str] = None
    annual_visitor: Optional[float] = None
    established: Optional[int] = None
    name: Optional[str] = None
    number_of_park: Optional[int] = None
    phone: Optional[str] = None
    square_mile: Optional[float] = None


@dataclass
class Council:
    bio: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    title: Optional[str] = None
    ward: Optional[str] = None


@dataclass
class CouncilListMatch:
    bio: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    title: Optional[str] = None
    ward: Optional[str] = None


@dataclass
class Department:
    contact: Optional[dict] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    service: Optional[list] = None
    url: Optional[str] = None


@dataclass
class DepartmentListMatch:
    contact: Optional[dict] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    service: Optional[list] = None
    url: Optional[str] = None


@dataclass
class EconomicDevelopment:
    industry: Optional[list] = None
    initiatif: Optional[list] = None
    resource: Optional[list] = None


@dataclass
class EconomicDevelopmentListMatch:
    industry: Optional[list] = None
    initiatif: Optional[list] = None
    resource: Optional[list] = None


@dataclass
class Event:
    category: Optional[str] = None
    description: Optional[str] = None
    end_date: Optional[str] = None
    id: Optional[str] = None
    is_free: Optional[bool] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    ticket_url: Optional[str] = None
    title: Optional[str] = None


@dataclass
class EventListMatch:
    category: Optional[str] = None
    description: Optional[str] = None
    end_date: Optional[str] = None
    id: Optional[str] = None
    is_free: Optional[bool] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    ticket_url: Optional[str] = None
    title: Optional[str] = None


@dataclass
class Job:
    application_url: Optional[str] = None
    category: Optional[str] = None
    close_date: Optional[str] = None
    department: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    post_date: Optional[str] = None
    requirement: Optional[list] = None
    salary_range: Optional[dict] = None
    title: Optional[str] = None


@dataclass
class JobListMatch:
    application_url: Optional[str] = None
    category: Optional[str] = None
    close_date: Optional[str] = None
    department: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    post_date: Optional[str] = None
    requirement: Optional[list] = None
    salary_range: Optional[dict] = None
    title: Optional[str] = None


@dataclass
class Meeting:
    agenda_url: Optional[str] = None
    date: Optional[str] = None
    id: Optional[str] = None
    location: Optional[str] = None
    minutes_url: Optional[str] = None
    status: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None


@dataclass
class MeetingListMatch:
    agenda_url: Optional[str] = None
    date: Optional[str] = None
    id: Optional[str] = None
    location: Optional[str] = None
    minutes_url: Optional[str] = None
    status: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None


@dataclass
class New:
    author: Optional[str] = None
    category: Optional[str] = None
    content: Optional[str] = None
    id: Optional[str] = None
    publish_date: Optional[str] = None
    summary: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class NewListMatch:
    author: Optional[str] = None
    category: Optional[str] = None
    content: Optional[str] = None
    id: Optional[str] = None
    publish_date: Optional[str] = None
    summary: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Park:
    address: Optional[str] = None
    amenity: Optional[list] = None
    hour: Optional[dict] = None
    id: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    type: Optional[str] = None


@dataclass
class ParkListMatch:
    address: Optional[str] = None
    amenity: Optional[list] = None
    hour: Optional[dict] = None
    id: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Permit:
    application_url: Optional[str] = None
    description: Optional[str] = None
    fee: Optional[float] = None
    id: Optional[str] = None
    name: Optional[str] = None
    processing_time: Optional[str] = None
    requirement: Optional[list] = None
    type: Optional[str] = None


@dataclass
class PermitListMatch:
    application_url: Optional[str] = None
    description: Optional[str] = None
    fee: Optional[float] = None
    id: Optional[str] = None
    name: Optional[str] = None
    processing_time: Optional[str] = None
    requirement: Optional[list] = None
    type: Optional[str] = None


@dataclass
class PublicSafety:
    fire: Optional[dict] = None
    medical: Optional[dict] = None
    police: Optional[dict] = None


@dataclass
class PublicSafetyLoadMatch:
    fire: Optional[dict] = None
    medical: Optional[dict] = None
    police: Optional[dict] = None

