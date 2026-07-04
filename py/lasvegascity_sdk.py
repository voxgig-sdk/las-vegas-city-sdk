# LasVegasCity SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import LasVegasCityUtility
from core.spec import LasVegasCitySpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import LasVegasCityBaseFeature
from features import _make_feature


class LasVegasCitySDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = LasVegasCityUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return LasVegasCityUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = LasVegasCitySpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def city_info(self):
        """Idiomatic facade: client.city_info.list() / client.city_info.load({"id": ...})."""
        from entity.city_info_entity import CityInfoEntity
        cached = getattr(self, "_city_info", None)
        if cached is None:
            cached = CityInfoEntity(self, None)
            self._city_info = cached
        return cached

    def CityInfo(self, data=None):
        # Deprecated: use client.city_info instead.
        from entity.city_info_entity import CityInfoEntity
        return CityInfoEntity(self, data)


    @property
    def council(self):
        """Idiomatic facade: client.council.list() / client.council.load({"id": ...})."""
        from entity.council_entity import CouncilEntity
        cached = getattr(self, "_council", None)
        if cached is None:
            cached = CouncilEntity(self, None)
            self._council = cached
        return cached

    def Council(self, data=None):
        # Deprecated: use client.council instead.
        from entity.council_entity import CouncilEntity
        return CouncilEntity(self, data)


    @property
    def department(self):
        """Idiomatic facade: client.department.list() / client.department.load({"id": ...})."""
        from entity.department_entity import DepartmentEntity
        cached = getattr(self, "_department", None)
        if cached is None:
            cached = DepartmentEntity(self, None)
            self._department = cached
        return cached

    def Department(self, data=None):
        # Deprecated: use client.department instead.
        from entity.department_entity import DepartmentEntity
        return DepartmentEntity(self, data)


    @property
    def economic_development(self):
        """Idiomatic facade: client.economic_development.list() / client.economic_development.load({"id": ...})."""
        from entity.economic_development_entity import EconomicDevelopmentEntity
        cached = getattr(self, "_economic_development", None)
        if cached is None:
            cached = EconomicDevelopmentEntity(self, None)
            self._economic_development = cached
        return cached

    def EconomicDevelopment(self, data=None):
        # Deprecated: use client.economic_development instead.
        from entity.economic_development_entity import EconomicDevelopmentEntity
        return EconomicDevelopmentEntity(self, data)


    @property
    def event(self):
        """Idiomatic facade: client.event.list() / client.event.load({"id": ...})."""
        from entity.event_entity import EventEntity
        cached = getattr(self, "_event", None)
        if cached is None:
            cached = EventEntity(self, None)
            self._event = cached
        return cached

    def Event(self, data=None):
        # Deprecated: use client.event instead.
        from entity.event_entity import EventEntity
        return EventEntity(self, data)


    @property
    def job(self):
        """Idiomatic facade: client.job.list() / client.job.load({"id": ...})."""
        from entity.job_entity import JobEntity
        cached = getattr(self, "_job", None)
        if cached is None:
            cached = JobEntity(self, None)
            self._job = cached
        return cached

    def Job(self, data=None):
        # Deprecated: use client.job instead.
        from entity.job_entity import JobEntity
        return JobEntity(self, data)


    @property
    def meeting(self):
        """Idiomatic facade: client.meeting.list() / client.meeting.load({"id": ...})."""
        from entity.meeting_entity import MeetingEntity
        cached = getattr(self, "_meeting", None)
        if cached is None:
            cached = MeetingEntity(self, None)
            self._meeting = cached
        return cached

    def Meeting(self, data=None):
        # Deprecated: use client.meeting instead.
        from entity.meeting_entity import MeetingEntity
        return MeetingEntity(self, data)


    @property
    def new(self):
        """Idiomatic facade: client.new.list() / client.new.load({"id": ...})."""
        from entity.new_entity import NewEntity
        cached = getattr(self, "_new", None)
        if cached is None:
            cached = NewEntity(self, None)
            self._new = cached
        return cached

    def New(self, data=None):
        # Deprecated: use client.new instead.
        from entity.new_entity import NewEntity
        return NewEntity(self, data)


    @property
    def park(self):
        """Idiomatic facade: client.park.list() / client.park.load({"id": ...})."""
        from entity.park_entity import ParkEntity
        cached = getattr(self, "_park", None)
        if cached is None:
            cached = ParkEntity(self, None)
            self._park = cached
        return cached

    def Park(self, data=None):
        # Deprecated: use client.park instead.
        from entity.park_entity import ParkEntity
        return ParkEntity(self, data)


    @property
    def permit(self):
        """Idiomatic facade: client.permit.list() / client.permit.load({"id": ...})."""
        from entity.permit_entity import PermitEntity
        cached = getattr(self, "_permit", None)
        if cached is None:
            cached = PermitEntity(self, None)
            self._permit = cached
        return cached

    def Permit(self, data=None):
        # Deprecated: use client.permit instead.
        from entity.permit_entity import PermitEntity
        return PermitEntity(self, data)


    @property
    def public_safety(self):
        """Idiomatic facade: client.public_safety.list() / client.public_safety.load({"id": ...})."""
        from entity.public_safety_entity import PublicSafetyEntity
        cached = getattr(self, "_public_safety", None)
        if cached is None:
            cached = PublicSafetyEntity(self, None)
            self._public_safety = cached
        return cached

    def PublicSafety(self, data=None):
        # Deprecated: use client.public_safety instead.
        from entity.public_safety_entity import PublicSafetyEntity
        return PublicSafetyEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
