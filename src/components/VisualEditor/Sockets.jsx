import Rete from 'rete'

const number = new Rete.Socket('Number')
const string = new Rete.Socket('String')
const variable = new Rete.Socket('Variable')
const vector2 = new Rete.Socket('Vector2')
const boolean = new Rete.Socket('Boolean')
const any = new Rete.Socket('Any')
const numberOrVariable = new Rete.Socket('NumberOrVariable')
const numberOrVariableOrVector = new Rete.Socket('NumberOrVariableOrVector')

number.combineWith(any)
variable.combineWith(any)
vector2.combineWith(any)
string.combineWith(any)

number.combineWith(numberOrVariable)
variable.combineWith(numberOrVariable)

number.combineWith(numberOrVariableOrVector)
variable.combineWith(numberOrVariableOrVector)
vector2.combineWith(numberOrVariableOrVector)
numberOrVariable.combineWith(numberOrVariableOrVector)

export { number, variable, vector2, boolean, numberOrVariable, numberOrVariableOrVector, string, any }
