# Callvera Test Assessment

Test assessment showcasing dashboard built with Expo stack for Callvera team.

## Screencast

Screencast showcasing app: [IOS screencast] [Android screencast]

## Get Started

1. Install dependencies: `npm run install`.
2. Add the `.env.local` file with variables. You can use `.env.example` as a template.
3. Run `npx expo prebuild` to generate native projects.
4. Run `npm run ios` and/or `npm run android` to run builds

## Linting

- `npm run format` - automatically fixes code style according to prettier rules
- `npm run lint` - checks for expo lint errors
- `npm run lint:fix` - fixes expo lint errors
- `npm run check:types` - runs types check

CI/CD pipeline automatically runs linter checks on push.
