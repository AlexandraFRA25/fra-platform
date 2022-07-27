import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'

import { VariableCache } from '../../../../../meta/assessment/assessmentMetaCache'
import { Context } from './context'

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): any {
    const { object, property } = expressionNode

    const { assessmentMetaCache, row, tableName, type } = this.context

    // @ts-ignore
    const objectName = object?.object?.name ?? object.name
    // @ts-ignore
    const propertyName = object?.property?.name ?? property.name

    if (assessmentMetaCache.variablesByTable[objectName]) {
      const dependantTable = assessmentMetaCache[type].dependants?.[objectName] ?? {}
      const dependants = dependantTable[propertyName] ?? []
      const dependant: VariableCache = { variableName: row.props.variableName, tableName }
      if (!dependants.find((d) => d.variableName === dependant.variableName)) {
        assessmentMetaCache[type].dependants = {
          ...assessmentMetaCache[type].dependants,
          // @ts-ignore
          [objectName]: {
            ...dependantTable,
            // @ts-ignore
            [propertyName]: [...dependants, dependant],
          },
        }
      }

      const dependencyTable = assessmentMetaCache[type].dependencies?.[tableName] ?? {}
      const dependencies = dependencyTable[row.props.variableName] ?? []
      // @ts-ignore
      const dependency: VariableCache = { variableName: propertyName, tableName: objectName }
      if (!dependencies.find((d) => d.variableName === dependency.variableName)) {
        assessmentMetaCache[type].dependencies = {
          ...assessmentMetaCache[type].dependencies,
          [tableName]: {
            ...dependencyTable,
            [row.props.variableName]: [...dependencies, dependency],
          },
        }
      }

      const evaluateObject = this.evaluator.evaluateNode(object, this.context)
      const evaluateProperty = this.evaluator.evaluateNode(property, this.context)
      return `${evaluateObject}.${evaluateProperty}`
    }
    return `${objectName}.${propertyName}`
  }
}