# LasVegasCity SDK utility: feature_add
module LasVegasCityUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
