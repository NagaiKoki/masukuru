export const factoryRandomCode = (length: number) : string => {
  let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let codeLength = length
  let result: string = "";

  for (let i = 0; i < codeLength; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length))
  }
  return result;
};