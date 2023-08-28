import { Platform } from 'react-native';

export const testProperties = (
  id: string,
  disableAccessible: boolean = false,
  enableTestSelectors: boolean = true,
): Object => {
  if (enableTestSelectors) {
    const disableAccessibility = disableAccessible ? { accessible: false } : {};
    return Platform.select({
      ios: {
        ...disableAccessibility,
        accessibilityLabel: null,
        accessibilityElementsHidden: undefined,
        testID: `test-${id}`.trim(),
      },
      android: {
        ...disableAccessibility,
        // @ts-ignore
        accessibilityLabel: `test-${id}`.trim(),
        accessibilityHint: null,
        accessibilityRole: null,
        accessibilityState: null,
        importantForAccessibility: undefined,
      },
      default: {},
    });
  }
  return {};
};
