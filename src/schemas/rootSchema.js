import { mergeSchemas } from 'graphql-tools'
import characterSchema from './character'

const rootSchema = mergeSchemas({
  schemas: [characterSchema],
})

export default rootSchema
