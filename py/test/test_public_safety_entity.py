# PublicSafety entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from lasvegascity_sdk import LasVegasCitySDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPublicSafetyEntity:

    def test_should_create_instance(self):
        testsdk = LasVegasCitySDK.test(None, None)
        ent = testsdk.PublicSafety(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _public_safety_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "public_safety." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        public_safety_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.public_safety")))
        public_safety_ref01_data = None
        if len(public_safety_ref01_data_raw) > 0:
            public_safety_ref01_data = helpers.to_map(public_safety_ref01_data_raw[0][1])

        # LOAD
        public_safety_ref01_ent = client.PublicSafety(None)
        public_safety_ref01_match_dt0 = {}
        public_safety_ref01_data_dt0_loaded = public_safety_ref01_ent.load(public_safety_ref01_match_dt0, None)
        assert public_safety_ref01_data_dt0_loaded is not None



def _public_safety_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/public_safety/PublicSafetyTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LasVegasCitySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["public_safety01", "public_safety02", "public_safety03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID": idmap,
        "LASVEGASCITY_TEST_LIVE": "FALSE",
        "LASVEGASCITY_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LASVEGASCITY_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = LasVegasCitySDK(helpers.to_map(merged_opts))

    _live = env.get("LASVEGASCITY_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LASVEGASCITY_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
