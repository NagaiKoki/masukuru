import { useActionSheet } from '@expo/react-native-action-sheet'

export const actionSheet = (
    options: string[], 
    handleOnClick1: () => void, 
    handleOnClick2?: () => void
) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const cancelButtonIndex = options.length;
  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        return handleOnClick1()
      } else if (buttonIndex === 1) {
        return handleOnClick2()
      }
    }
  )
}