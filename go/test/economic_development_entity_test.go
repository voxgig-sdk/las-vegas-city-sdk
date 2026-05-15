package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/las-vegas-city-sdk"
	"github.com/voxgig-sdk/las-vegas-city-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestEconomicDevelopmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EconomicDevelopment(nil)
		if ent == nil {
			t.Fatal("expected non-nil EconomicDevelopmentEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := economic_developmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "economic_development." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LASVEGASCITY_TEST_ECONOMIC_DEVELOPMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		economicDevelopmentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.economic_development", setup.data)))
		var economicDevelopmentRef01Data map[string]any
		if len(economicDevelopmentRef01DataRaw) > 0 {
			economicDevelopmentRef01Data = core.ToMapAny(economicDevelopmentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = economicDevelopmentRef01Data

		// LIST
		economicDevelopmentRef01Ent := client.EconomicDevelopment(nil)
		economicDevelopmentRef01Match := map[string]any{}

		economicDevelopmentRef01ListResult, err := economicDevelopmentRef01Ent.List(economicDevelopmentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, economicDevelopmentRef01ListOk := economicDevelopmentRef01ListResult.([]any)
		if !economicDevelopmentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", economicDevelopmentRef01ListResult)
		}

	})
}

func economic_developmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "economic_development", "EconomicDevelopmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read economic_development test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse economic_development test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"economic_development01", "economic_development02", "economic_development03"},
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
	entidEnvRaw := os.Getenv("LASVEGASCITY_TEST_ECONOMIC_DEVELOPMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LASVEGASCITY_TEST_ECONOMIC_DEVELOPMENT_ENTID": idmap,
		"LASVEGASCITY_TEST_LIVE":      "FALSE",
		"LASVEGASCITY_TEST_EXPLAIN":   "FALSE",
		"LASVEGASCITY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LASVEGASCITY_TEST_ECONOMIC_DEVELOPMENT_ENTID"])
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
