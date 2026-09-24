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
(0, node_test_1.describe)('PublicSafetyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAS_VEGAS_CITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAS_VEGAS_CITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LasVegasCitySDK.test();
        const ent = testsdk.PublicSafety();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAS_VEGAS_CITY_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'public_safety.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "fire": { "a": true, "h": "Fire", "n": "fire", "r": false, "t": "`$OBJECT`", "key$": "fire", "index$": 0 }, "medical": { "a": true, "h": "Medical", "n": "medical", "r": false, "t": "`$OBJECT`", "key$": "medical", "index$": 1 }, "police": { "a": true, "h": "Police", "n": "police", "r": false, "t": "`$OBJECT`", "key$": "police", "index$": 2 } }, "name": "public_safety", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /public-safety", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/public-safety", "q": {}, "r": {}, "s": [{ "lit": "public-safety" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "public_safety", "name__orig": "public_safety", "Name": "PublicSafety", "name_": "public_safety", "name-": "public-safety", "NAME": "PUBLIC_SAFETY", "index$": 10 }, { "active": true, "entity": "public_safety", "key$": "BasicPublicSafetyFlow", "kind": "basic", "name": "BasicPublicSafetyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "public_safety_ref01", "srcdatavar": "public_safety_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-public_safety_ref01" } }], "index$": 0 }] }, 'PublicSafety', { "GET /public-safety": { "protocol": "http", "operationId": "getPublicSafety", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "fire": { "key$": "fire", "properties": { "emergencyNumber": { "type": "string" }, "nonEmergencyNumber": { "type": "string" }, "services": { "items": { "type": "string" }, "type": "array" } }, "type": "object" }, "police": { "key$": "police", "properties": { "emergencyNumber": { "type": "string" }, "nonEmergencyNumber": { "type": "string" }, "services": { "items": { "type": "string" }, "type": "array" } }, "type": "object" }, "medical": { "key$": "medical", "properties": { "emergencyNumber": { "type": "string" }, "services": { "items": { "type": "string" }, "type": "array" } }, "type": "object" } }, "x-ref": "#/components/schemas/PublicSafety", "index$": 0 } } } }, "400": { "description": "Bad request" }, "500": { "description": "Internal server error" } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let public_safety_ref01_data = Object.values(setup.data.existing.public_safety)[0];
        // LOAD
        const public_safety_ref01_ent = client.PublicSafety();
        const public_safety_ref01_match_dt0 = {};
        const public_safety_ref01_data_dt0 = (await public_safety_ref01_ent.load(public_safety_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != public_safety_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/public_safety/PublicSafetyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LasVegasCitySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['public_safety01', 'public_safety02', 'public_safety03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAS_VEGAS_CITY_TEST_PUBLIC_SAFETY_ENTID': idmap,
        'LAS_VEGAS_CITY_TEST_LIVE': 'FALSE',
        'LAS_VEGAS_CITY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAS_VEGAS_CITY_TEST_PUBLIC_SAFETY_ENTID'];
    const live = 'TRUE' === env.LAS_VEGAS_CITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAS_VEGAS_CITY_TEST_PUBLIC_SAFETY_ENTID'];
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
//# sourceMappingURL=PublicSafetyEntity.test.js.map