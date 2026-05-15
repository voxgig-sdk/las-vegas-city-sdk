# ProjectName SDK exists test

import pytest
from lasvegascity_sdk import LasVegasCitySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LasVegasCitySDK.test(None, None)
        assert testsdk is not None
