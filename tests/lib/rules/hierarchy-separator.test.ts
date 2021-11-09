/**
 * @fileoverview Deprecated hierarchy separator
 * @author Yann Braga
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { AST_NODE_TYPES } from '@typescript-eslint/types'
import dedent from 'ts-dedent'

import rule from '../../../lib/rules/hierarchy-separator'
import ruleTester from '../../utils/rule-tester'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('hierarchy-separator', rule, {
  valid: [
    "export default { title: 'Examples/Components/Button' }",
    "export default { title: 'Examples/Components/Button' } as ComponentMeta<typeof Button>",
  ],

  invalid: [
    {
      code: "export default { title: 'Examples|Components|Button' }",
      output: "export default { title: 'Examples/Components/Button' }",
      errors: [
        {
          type: AST_NODE_TYPES.ExportDefaultDeclaration,
          messageId: 'deprecatedHierarchySeparator',
          suggestions: [
            {
              messageId: 'useCorrectSeparators',
              output: "export default { title: 'Examples/Components/Button' }",
            },
          ],
        },
      ],
    },
    {
      code: "export default { title: 'Examples.Components.Button' }",
      output: "export default { title: 'Examples/Components/Button' }",
      errors: [
        {
          type: AST_NODE_TYPES.ExportDefaultDeclaration,
          messageId: 'deprecatedHierarchySeparator',
          suggestions: [
            {
              messageId: 'useCorrectSeparators',
              output: "export default { title: 'Examples/Components/Button' }",
            },
          ],
        },
      ],
    },
    {
      code: dedent`
        const meta = { title: 'Examples.Components.Button' }
        export default meta
      `,
      output: dedent`
        const meta = { title: 'Examples/Components/Button' }
        export default meta
      `,
      errors: [
        {
          type: AST_NODE_TYPES.ExportDefaultDeclaration,
          messageId: 'deprecatedHierarchySeparator',
          suggestions: [
            {
              messageId: 'useCorrectSeparators',
              output: dedent`
                const meta = { title: 'Examples/Components/Button' }
                export default meta
              `,
            },
          ],
        },
      ],
    },
  ],
})