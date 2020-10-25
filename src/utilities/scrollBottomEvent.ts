export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}, paddingToBottom: number = 20) => {
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};