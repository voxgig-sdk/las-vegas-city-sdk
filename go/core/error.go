package core

type LasVegasCityError struct {
	IsLasVegasCityError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLasVegasCityError(code string, msg string, ctx *Context) *LasVegasCityError {
	return &LasVegasCityError{
		IsLasVegasCityError: true,
		Sdk:              "LasVegasCity",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LasVegasCityError) Error() string {
	return e.Msg
}
