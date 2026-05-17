package utility

import "github.com/voxgig-sdk/las-vegas-city-sdk/go/core"

func resultBodyUtil(ctx *core.Context) *core.Result {
	response := ctx.Response
	result := ctx.Result

	if result != nil {
		if response != nil && response.JsonFunc != nil && response.Body != nil {
			json := response.JsonFunc()
			result.Body = json
		}
	}

	return result
}
