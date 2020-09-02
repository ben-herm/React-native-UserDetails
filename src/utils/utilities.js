// navigation utility function.

export const navigateToPage = (
  pageName = 'WelcomePage',
  navigation,
  params = null,
) => {
  if (pageName == 'WelcomePage') {
    navigation.popToTop()
  }
  navigation.navigate(pageName, params)
}
