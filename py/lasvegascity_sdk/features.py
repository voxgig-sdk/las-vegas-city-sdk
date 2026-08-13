# LasVegasCity SDK feature factory

from lasvegascity_sdk.feature.base_feature import LasVegasCityBaseFeature
from lasvegascity_sdk.feature.test_feature import LasVegasCityTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LasVegasCityBaseFeature(),
        "test": lambda: LasVegasCityTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
