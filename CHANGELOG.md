# Change Log

This project adheres to [Semantic Versioning](http://semver.org/)

## 0.12.0

- feature: Use event delegation for native events
- fix: Don't use the nullish operator

## 0.11.0

- Export all inner types
- Add `useClickOutside`
- Add `usePrefersColorScheme`
- Delete `useSwitch` in favor `useToggle`
- Delete `useFetch`, better to use separate libraries for that
- Delete `useGlobalState`, better to use separate state managers

## 0.10.2

- Rename `useResize` to `useWindowResize`
- No restart timeout in `useTimeout` when change state
- Fix the reset/repeat timeout in `useIdle`

## 0.10.0

- Add hook `useIdle`
- Hook `useTimeout` now return `{ reset, repeat }` instead `{ resetTimeout }`
- Delete unnecessary files from package
- Minify size of package
- Fix peer-dependency for React

## 0.9.1

- Fix publish to NPM :)

## 0.9.0

- Improve docs for hooks
- Add hook `useNativeEvent`
- Add hook `useToggle`
- Rename `useDate` to `useCurrentDate`
- Add events to `useKeyboardEvents`
