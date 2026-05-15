# LasVegasCity SDK feature factory

from feature.base_feature import LasVegasCityBaseFeature
from feature.test_feature import LasVegasCityTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LasVegasCityBaseFeature(),
        "test": lambda: LasVegasCityTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
