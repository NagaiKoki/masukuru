import { useActionSheet } from '@expo/react-native-action-sheet'

export const actionSheet = (
    options: string[], 
    handleOnSomethingAction: () => void, 
    handleOnDeleteAction: any // 削除時にAlertを出す場合を考慮してAny型とする
) => {
  const { showActionSheetWithOptions } = useActionSheet();
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