package = "voxgig-sdk-las-vegas-city"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/las-vegas-city-sdk.git"
}
description = {
  summary = "LasVegasCity SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["las-vegas-city_sdk"] = "las-vegas-city_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
