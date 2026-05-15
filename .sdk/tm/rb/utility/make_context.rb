# LasVegasCity SDK utility: make_context
require_relative '../core/context'
module LasVegasCityUtilities
  MakeContext = ->(ctxmap, basectx) {
    LasVegasCityContext.new(ctxmap, basectx)
  }
end
