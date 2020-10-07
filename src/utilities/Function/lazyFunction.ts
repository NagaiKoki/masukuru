let timeId: NodeJS.Timeout
export const lazyFunction = (func: Function, ms: number) => (...args: any) => {
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    func(args)
  }, ms);
}