<?php
declare(strict_types=1);

// Typed models for the LasVegasCity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CityInfo entity data model. */
class CityInfo
{
    public ?string $address = null;
    public ?float $annual_visitor = null;
    public ?int $established = null;
    public ?string $name = null;
    public ?int $number_of_park = null;
    public ?string $phone = null;
    public ?float $square_mile = null;
}

/** Match filter for CityInfo#load (any subset of CityInfo fields). */
class CityInfoLoadMatch
{
    public ?string $address = null;
    public ?float $annual_visitor = null;
    public ?int $established = null;
    public ?string $name = null;
    public ?int $number_of_park = null;
    public ?string $phone = null;
    public ?float $square_mile = null;
}

/** Council entity data model. */
class Council
{
    public ?string $bio = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $title = null;
    public ?string $ward = null;
}

/** Match filter for Council#list (any subset of Council fields). */
class CouncilListMatch
{
    public ?string $bio = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $title = null;
    public ?string $ward = null;
}

/** Department entity data model. */
class Department
{
    public ?array $contact = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $service = null;
    public ?string $url = null;
}

/** Match filter for Department#list (any subset of Department fields). */
class DepartmentListMatch
{
    public ?array $contact = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $service = null;
    public ?string $url = null;
}

/** EconomicDevelopment entity data model. */
class EconomicDevelopment
{
    public ?array $industry = null;
    public ?array $initiatif = null;
    public ?array $resource = null;
}

/** Match filter for EconomicDevelopment#list (any subset of EconomicDevelopment fields). */
class EconomicDevelopmentListMatch
{
    public ?array $industry = null;
    public ?array $initiatif = null;
    public ?array $resource = null;
}

/** Event entity data model. */
class Event
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $end_date = null;
    public ?string $id = null;
    public ?bool $is_free = null;
    public ?string $location = null;
    public ?string $start_date = null;
    public ?string $ticket_url = null;
    public ?string $title = null;
}

/** Match filter for Event#list (any subset of Event fields). */
class EventListMatch
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $end_date = null;
    public ?string $id = null;
    public ?bool $is_free = null;
    public ?string $location = null;
    public ?string $start_date = null;
    public ?string $ticket_url = null;
    public ?string $title = null;
}

/** Job entity data model. */
class Job
{
    public ?string $application_url = null;
    public ?string $category = null;
    public ?string $close_date = null;
    public ?string $department = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $post_date = null;
    public ?array $requirement = null;
    public ?array $salary_range = null;
    public ?string $title = null;
}

/** Match filter for Job#list (any subset of Job fields). */
class JobListMatch
{
    public ?string $application_url = null;
    public ?string $category = null;
    public ?string $close_date = null;
    public ?string $department = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $post_date = null;
    public ?array $requirement = null;
    public ?array $salary_range = null;
    public ?string $title = null;
}

/** Meeting entity data model. */
class Meeting
{
    public ?string $agenda_url = null;
    public ?string $date = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?string $minutes_url = null;
    public ?string $status = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** Match filter for Meeting#list (any subset of Meeting fields). */
class MeetingListMatch
{
    public ?string $agenda_url = null;
    public ?string $date = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?string $minutes_url = null;
    public ?string $status = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** New entity data model. */
class New
{
    public ?string $author = null;
    public ?string $category = null;
    public ?string $content = null;
    public ?string $id = null;
    public ?string $publish_date = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Match filter for New#list (any subset of New fields). */
class NewListMatch
{
    public ?string $author = null;
    public ?string $category = null;
    public ?string $content = null;
    public ?string $id = null;
    public ?string $publish_date = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Park entity data model. */
class Park
{
    public ?string $address = null;
    public ?array $amenity = null;
    public ?array $hour = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $type = null;
}

/** Match filter for Park#list (any subset of Park fields). */
class ParkListMatch
{
    public ?string $address = null;
    public ?array $amenity = null;
    public ?array $hour = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $type = null;
}

/** Permit entity data model. */
class Permit
{
    public ?string $application_url = null;
    public ?string $description = null;
    public ?float $fee = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $processing_time = null;
    public ?array $requirement = null;
    public ?string $type = null;
}

/** Match filter for Permit#list (any subset of Permit fields). */
class PermitListMatch
{
    public ?string $application_url = null;
    public ?string $description = null;
    public ?float $fee = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $processing_time = null;
    public ?array $requirement = null;
    public ?string $type = null;
}

/** PublicSafety entity data model. */
class PublicSafety
{
    public ?array $fire = null;
    public ?array $medical = null;
    public ?array $police = null;
}

/** Match filter for PublicSafety#load (any subset of PublicSafety fields). */
class PublicSafetyLoadMatch
{
    public ?array $fire = null;
    public ?array $medical = null;
    public ?array $police = null;
}

