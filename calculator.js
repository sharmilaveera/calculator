class Calculator 
{
                constructor(previousDataTextElement, currentDataTextElement) 
                {
                this.previousDataTextElement = previousDataTextElement
                this.currentDataTextElement = currentDataTextElement
                this.clear()
                
                
                }
                clear() 
                {
                    this.currentData = ''
                    this.previousData = ''
                    this.operation = undefined
                    
                }
                delete() 
                {
                    this.currentData = ''
                    this.previousData = ''
                    this.operation = undefined
                    
                }
                getDisplayNum(num) {
                    const stringNum = num.toString()
                    const integerDigits = parseFloat(stringNum.split('.')[0])
                    const decimalDigits = stringNum.split('.')[1]
                    let integerDisplay
                    if (isNaN(integerDigits)) {
                      integerDisplay = ''
                    } else {
                      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
                    }
                    if (decimalDigits != null) {
                      return `${integerDisplay}.${decimalDigits}`
                    } else {
                      return integerDisplay
                    }
                  }
                
                  display() {
                    this.currentDataTextElement.innerText =
                      this.getDisplayNum(this.currentData)
                    if (this.operation != null) {
                      this.previousDataTextElement.innerText =
                        `${this.getDisplayNum(this.previousData)} ${this.operation}`
                    } else {
                      this.previousDataTextElement.innerText = ''
                    }
                  }
                  
                appendNum(num)
                {    
                    if (num === '.' && this.currentData.includes('.')) return
                    this.currentData = this.currentData.toString() + num.toString()
                }
                appendEqual(equal)
                {    
                    if (num === '=' && this.currentData.includes('=')) return
                    this.currentData = this.currentData.toString() + num.toString()
                }
                chooseOperation(operation) {
                    if (this.currentData === '') return
                    if (this.previousData !== '') {
                      this.compute()
                    }
                    this.operation = operation
                    this.previousData = this.currentData
                    this.currentData = ''
                  }
                
                  compute() {
                    let computation
                    const prev = parseFloat(this.previousData)
                    const current = parseFloat(this.currentData)
                    if (isNaN(prev) || isNaN(current)) return
                    switch (this.operation) {
                      case '+':
                        computation = prev + current
                        break
                      case '-':
                        computation = prev - current
                        break
                      case '*':
                        computation = prev * current
                        break
                      case '÷':
                        computation = prev / current
                        break
                      default:
                        return
                    }
                    this.currentData = computation
                    this.operation = undefined
                    this.previousData = ''
                  }

                 
    

}
const numButtons = document.querySelectorAll('[num]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelectorAll('[equals]')
const deleteButton = document.querySelectorAll('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousDataTextElement = document.querySelector('[previous-data]')
const currentDataTextElement = document.querySelector('[current-data]')


const calculator = new Calculator(previousDataTextElement, currentDataTextElement)
 
numButtons.forEach
(button=>
    {
      button.addEventListener('click',()=>
      {
          calculator.appendNum(button.innerText)
          calculator.display()
      })
    }
)


operationButtons.forEach
(button=>
    {
      button.addEventListener('click',()=>
      {
          calculator.chooseOperation(button.innerText)
          calculator.display()
      })
    }
)


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.display()
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.display()
  })
  