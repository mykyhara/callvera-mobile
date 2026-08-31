# Callvera Test Assessment

Test assessment showcasing dashboard built with Expo stack for Callvera team.

## Screencast

Screencasts showcasing app: 

https://github.com/user-attachments/assets/de3f4726-da0b-4399-8df9-a4751f0d4810

https://github.com/user-attachments/assets/5d752f04-7391-4ba2-87ba-7fe820d8bcad

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
