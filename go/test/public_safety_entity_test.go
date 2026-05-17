package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/las-vegas-city-sdk/go"
	"github.com/voxgig-sdk/las-vegas-city-sdk/go/core"

	vs "github.com/voxgig-sdk/las-vegas-city-sdk/go/utility/struct"
)

func TestPublicSafetyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PublicSafety(nil)
		if ent == nil {
			t.Fatal("expected non-nil PublicSafetyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := public_safetyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "public_safety." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		publicSafetyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.public_safety", setup.data)))
		var publicSafetyRef01Data map[string]any
		if len(publicSafetyRef01DataRaw) > 0 {
			publicSafetyRef01Data = core.ToMapAny(publicSafetyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = publicSafetyRef01Data

		// LOAD
		publicSafetyRef01Ent := client.PublicSafety(nil)
		publicSafetyRef01MatchDt0 := map[string]any{}
		publicSafetyRef01DataDt0Loaded, err := publicSafetyRef01Ent.Load(publicSafetyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if publicSafetyRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func public_safetyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "public_safety", "PublicSafetyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read public_safety test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse public_safety test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"public_safety01", "public_safety02", "public_safety03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID": idmap,
		"LASVEGASCITY_TEST_LIVE":      "FALSE",
		"LASVEGASCITY_TEST_EXPLAIN":   "FALSE",
		"LASVEGASCITY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LASVEGASCITY_TEST_PUBLIC_SAFETY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LASVEGASCITY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LASVEGASCITY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLasVegasCitySDK(core.ToMapAny(mergedOpts))
	}

	live := env["LASVEGASCITY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LASVEGASCITY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
