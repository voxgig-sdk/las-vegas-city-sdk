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
    public ?float $annualVisitors = null;
    public ?int $established = null;
    public ?string $name = null;
    public ?int $numberOfParks = null;
    public ?string $phone = null;
    public ?float $squareMiles = null;
}

/** Request payload for CityInfo#load. */
class CityInfoLoadMatch
{
    public ?string $address = null;
    public ?float $annualVisitors = null;
    public ?int $established = null;
    public ?string $name = null;
    public ?int $numberOfParks = null;
    public ?string $phone = null;
    public ?float $squareMiles = null;
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

/** Request payload for Council#list. */
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
    public ?array $services = null;
    public ?string $url = null;
}

/** Request payload for Department#list. */
class DepartmentListMatch
{
    public ?array $contact = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $services = null;
    public ?string $url = null;
}

/** EconomicDevelopment entity data model. */
class EconomicDevelopment
{
    public ?array $industries = null;
    public ?array $initiatives = null;
    public ?array $resources = null;
}

/** Request payload for EconomicDevelopment#list. */
class EconomicDevelopmentListMatch
{
    public ?array $industries = null;
    public ?array $initiatives = null;
    public ?array $resources = null;
}

/** Event entity data model. */
class Event
{
    public ?string $category = null;
    public ?string $description = null;
    public ?string $endDate = null;
    public ?string $id = null;
    public ?bool $isFree = null;
    public ?string $location = null;
    public ?string $startDate = null;
    public ?string $ticketUrl = null;
    public ?string $title = null;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public ?string $category = null;
    public ?string $end_date = null;
    public ?string $start_date = null;
}

/** Job entity data model. */
class Job
{
    public ?string $applicationUrl = null;
    public ?string $category = null;
    public ?string $closeDate = null;
    public ?string $department = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $postDate = null;
    public ?array $requirements = null;
    public ?array $salaryRange = null;
    public ?string $title = null;
}

/** Request payload for Job#list. */
class JobListMatch
{
    public ?string $category = null;
    public ?string $department = null;
}

/** Meeting entity data model. */
class Meeting
{
    public ?string $agendaUrl = null;
    public ?string $date = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?string $minutesUrl = null;
    public ?string $status = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** Request payload for Meeting#list. */
class MeetingListMatch
{
    public ?string $start_date = null;
    public ?string $type = null;
}

/** New entity data model. */
class NewType
{
    public ?string $author = null;
    public ?string $category = null;
    public ?string $content = null;
    public ?string $id = null;
    public ?string $publishDate = null;
    public ?string $summary = null;
    public ?string $title = null;
    public ?string $url = null;
}

/** Request payload for New#list. */
class NewListMatch
{
    public ?string $category = null;
    public ?int $limit = null;
}

/** Park entity data model. */
class Park
{
    public ?string $address = null;
    public ?array $amenities = null;
    public ?array $hours = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $type = null;
}

/** Request payload for Park#list. */
class ParkListMatch
{
    public ?string $amenity = null;
    public ?string $location = null;
}

/** Permit entity data model. */
class Permit
{
    public ?string $applicationUrl = null;
    public ?string $description = null;
    public ?float $fee = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $processingTime = null;
    public ?array $requirements = null;
    public ?string $type = null;
}

/** Request payload for Permit#list. */
class PermitListMatch
{
    public ?string $type = null;
}

/** PublicSafety entity data model. */
class PublicSafety
{
    public ?array $fire = null;
    public ?array $medical = null;
    public ?array $police = null;
}

/** Request payload for PublicSafety#load. */
class PublicSafetyLoadMatch
{
    public ?array $fire = null;
    public ?array $medical = null;
    public ?array $police = null;
}

