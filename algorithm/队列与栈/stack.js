// ----------------- 栈，规则：先进后出

/**
 * 模拟一个编辑器的 undo，redo 操作
 */

class Stack {
  stack = []

  push(content) {
    this.stack.push(content)
  }

  pop() {
    return this.stack.pop()
  }

  peek() {
    return this. stack[this.stack.length]
  }

  getStack() {
    return this.stack
  }
}

class UndoRedoStack {
  patches = new Stack()
  inverPatches = new Stack()

  update(content) {
    this.patches.push(content)
  }

  undo() {
    const content = this.patches.pop()
    this.inverPatches.push(content)
  }

  redo() {
    const content = this.inverPatches.pop()
    this.patches.push(content)
  }

  getPatches() {
    console.log(this.patches);
    return this.patches
  }
} 


const undoRedoStack = new UndoRedoStack()

console.log('update 操作');
undoRedoStack.update(1)
undoRedoStack.update(2)
undoRedoStack.update(3)
undoRedoStack.update(4)
undoRedoStack.update(5)
undoRedoStack.getPatches()

console.log('undo 操作');
undoRedoStack.undo()
undoRedoStack.getPatches()

console.log('undo 操作');
undoRedoStack.undo()
undoRedoStack.getPatches()

console.log('redo 操作');
undoRedoStack.redo()
undoRedoStack.getPatches()