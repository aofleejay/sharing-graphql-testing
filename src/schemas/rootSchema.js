import { mergeSchemas } from 'graphql-tools'
import characterSchema from './characters'

const rootSchema = mergeSchemas({
  schemas: [characterSchema],
})

export default rootSchema
