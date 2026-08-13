# LasVegasCity SDK utility: make_context

from projectname_sdk.core.context import LasVegasCityContext


def make_context_util(ctxmap, basectx):
    return LasVegasCityContext(ctxmap, basectx)
