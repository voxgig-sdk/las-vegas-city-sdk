"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EconomicDevelopmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAS_VEGAS_CITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAS_VEGAS_CITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LasVegasCitySDK.test();
        const ent = testsdk.EconomicDevelopment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAS_VEGAS_CITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'economic_development.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "industries": { "a": true, "h": "Industries", "n": "industries", "r": false, "t": "`$ARRAY`", "key$": "industries", "index$": 0 }, "initiatives": { "a": true, "h": "Initiatives", "n": "initiatives", "r": false, "t": "`$ARRAY`", "key$": "initiatives", "index$": 1 }, "resources": { "a": true, "h": "Resources", "n": "resources", "r": false, "t": "`$ARRAY`", "key$": "resources", "index$": 2 } }, "name": "economic_development", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /business/economic-development", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/business/economic-development", "q": {}, "r": {}, "s": [{ "lit": "business" }, { "lit": "economic-development" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "economic_development", "name__orig": "economic_development", "Name": "EconomicDevelopment", "name_": "economic_development", "name-": "economic-development", "NAME": "ECONOMIC_DEVELOPMENT", "index$": 3 }, { "active": true, "entity": "economic_development", "key$": "BasicEconomicDevelopmentFlow", "kind": "basic", "name": "BasicEconomicDevelopmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "economic_development_ref01" } }], "index$": 0 }] }, 'EconomicDevelopment', { "GET /business/economic-development": { "protocol": "http", "operationId": "getEconomicDevelopment", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "initiatives": { "items": { "properties": { "benefits": { "items": { "type": "string" }, "type": "array" }, "description": { "type": "string" }, "name": { "type": "string" } }, "type": "object" }, "key$": "initiatives", "type": "array" }, "industries": { "items": { "type": "string" }, "key$": "industries", "type": "array" }, "resources": { "items": { "properties": { "description": { "type": "string" }, "title": { "type": "string" }, "url": { "format": "uri", "type": "string" } }, "type": "object" }, "key$": "resources", "type": "array" } }, "x-ref": "#/components/schemas/EconomicDevelopment", "index$": 0 } } } }, "400": { "description": "Bad request" }, "500": { "description": "Internal server error" } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let economic_development_ref01_data = Object.values(setup.data.existing.economic_development)[0];
        // LIST
        const economic_development_ref01_ent = client.EconomicDevelopment();
        const economic_development_ref01_match = {};
        const economic_development_ref01_list = (await economic_development_ref01_ent.list(economic_development_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/economic_development/EconomicDevelopmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LasVegasCitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['economic_development01', 'economic_development02', 'economic_development03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAS_VEGAS_CITY_TEST_ECONOMIC_DEVELOPMENT_ENTID': idmap,
        'LAS_VEGAS_CITY_TEST_LIVE': 'FALSE',
        'LAS_VEGAS_CITY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAS_VEGAS_CITY_TEST_ECONOMIC_DEVELOPMENT_ENTID'];
    const live = 'TRUE' === env.LAS_VEGAS_CITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAS_VEGAS_CITY_TEST_ECONOMIC_DEVELOPMENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LasVegasCitySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LAS_VEGAS_CITY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EconomicDevelopmentEntity.test.js.map