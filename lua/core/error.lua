-- LasVegasCity SDK error

local LasVegasCityError = {}
LasVegasCityError.__index = LasVegasCityError


function LasVegasCityError.new(code, msg, ctx)
  local self = setmetatable({}, LasVegasCityError)
  self.is_sdk_error = true
  self.sdk = "LasVegasCity"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LasVegasCityError:error()
  return self.msg
end


function LasVegasCityError:__tostring()
  return self.msg
end


return LasVegasCityError
