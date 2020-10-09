let timeId: NodeJS.Timeout
export const lazyFunction = (func: Function, ms: number) => (arg: any) => {
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    func(arg)
  }, ms);
}