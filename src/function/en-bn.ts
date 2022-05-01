export const enToBn = (input: string | number) => {
  input = String(input)

  let numbers = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯'
  }

  let output: string[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i] in numbers) {
      output.push(numbers[input[i] as keyof typeof numbers])
    } else {
      output.push(input[i])
    }
  }
  return output.join('').toString()
}

export const bnToEn = (input: string): string => {
  let numbers = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9'
  }
  let output: string[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i] in numbers) {
      output.push(numbers[input[i] as keyof typeof numbers])
    } else {
      output.push(input[i])
    }
  }
  return output.join('').toString()
}
