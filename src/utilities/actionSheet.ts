export const actionSheet = (
    options: string[],
    showActionSheetWithOptions: any,
    handleOnSomethingAction: () => void, 
    handleOnDeleteAction: () => void
) => {
  const destructiveButtonIndex = 1;
  const cancelButtonIndex = 2;
  showActionSheetWithOptions(
    {
      options,
      destructiveButtonIndex,
      cancelButtonIndex,
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        return handleOnSomethingAction()
      } else if (buttonIndex === 1) {
        return handleOnDeleteAction()
      }
    }
  )
}