# Change Log

This project adheres to [Semantic Versioning](http://semver.org/)

## 0.11.0

- Add hook `useToggle`

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
