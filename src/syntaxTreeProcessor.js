export default class SyntaxTreeProcessor {
  #filePath
  #errors = new Map()
  #messages = {
    singleQuote: () => 'use single quotes instead of double quotes'
  }

  constructor(filePath) {
    this.#filePath = filePath
  }

  #storeError(message, { line, column }) {
    const errorLocation = `${this.#filePath}:${line}:${column}`
    this.#errors.set(errorLocation, { message, errorLocation })
  }

  #handleLiteral(nodeDeclaration) {
    if (!(nodeDeclaration.raw && typeof nodeDeclaration.value === 'string')) {
      return;
    }
    
    if (!nodeDeclaration.raw.includes(`"`)) return;
    nodeDeclaration.raw = nodeDeclaration.raw.replace(/"/g, "'")
    
    this.#storeError(
      this.#messages.singleQuote(),
      nodeDeclaration.loc.start
    )
  }

  #traverse(nodeDeclaration) {
    const hooks = {
      Literal: (node) => this.#handleLiteral(node)
    }

    hooks[nodeDeclaration?.type]?.(nodeDeclaration)

    for (const key in nodeDeclaration) {
      if (typeof nodeDeclaration[key] !== 'object') continue
      this.#traverse(nodeDeclaration[key])
    }
  }

  process(ast) {
    this.#traverse(ast)

    return [...this.#errors.values()]
  }
}