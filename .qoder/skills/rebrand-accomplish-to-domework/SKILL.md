---
name: rebrand-accomplish-to-domework
description: Rebrand the Accomplish AI desktop application to Domework by updating all user-facing branding including package names, app metadata, UI text, logos, and Electron config. Preserves internal module names and core code. Use when forking the Accomplish repo and needing to rebrand for distribution.
---

# Rebrand Accomplish → Domework

Rebrand the Accomplish AI desktop application to Domework for independent distribution. This skill covers all user-facing branding changes while preserving internal APIs and core functionality.

## Preserved (DO NOT CHANGE)

These must remain unchanged to avoid breaking functionality:

- **Internal module names**: `@accomplish_ai/agent-core`, `@accomplish_ai/agent-core/*`
- **Internal API names**: `getAccomplish()`, `accomplishRuntime`, `window.accomplish`
- **URL protocol scheme**: `accomplish://` (breaking change for OAuth callbacks)
- **Legacy data paths**: `~/Accomplish` in migration code (old user data folder on disk)
- **Core/feature code**: Do not modify business logic, IPC handlers, or feature implementations

## Task List

### 1. Package Names & Metadata

Update these `package.json` files:

| File                        | Fields to Change                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `package.json` (root)       | `name`, `description`, `author`, `repository.url`                                                                        |
| `apps/desktop/package.json` | `name`, `author`, `homepage`, `productName`, `appId`, `artifactName`, `shortcutName`, `publish.owner`, script references |
| `apps/daemon/package.json`  | `name`, `description`                                                                                                    |
| `apps/web/package.json`     | `name`, `description`                                                                                                    |

Replace `@accomplish/*` workspace references with `@domework/*` in all package.json files and build scripts.

### 2. Electron App Metadata

Update in `apps/desktop/package.json`:

- `productName`: `"Domework"`
- `appId`: `"ai.domework.desktop"` (or your own reverse-domain)
- `artifactName`: `"Domework-${version}-${arch}.${ext}"`
- `shortcutName`: `"Domework"`
- `publish.owner`: `"your-org"`

### 3. Build Scripts & Configs

Update package name references in:

- `scripts/dev.cjs`
- `scripts/dev-remote.cjs`
- `scripts/ensure-daemon-built.cjs`
- `scripts/ensure-agent-core-built.cjs`
- `scripts/check-native-abi.cjs`

Replace `@accomplish/web`, `@accomplish/desktop`, `@accomplish/daemon` with `@domework/*` equivalents.

### 4. UI Text & HTML Titles

Update user-facing text in:

- `apps/desktop/index.html`: `<title>Domework</title>`
- `apps/web/index.html`: `<title>Domework</title>`
- `apps/desktop/src/main/menu.ts`: About dialog labels, copyright, Learn More URL
- `apps/desktop/src/main/tray.ts`: Tray tooltip and menu labels
- `apps/desktop/src/main/app-window.ts`: Window title
- `apps/desktop/src/main/index.ts`: `APP_DATA_NAME`, `app.setName()`
- `apps/desktop/src/main/daemon/service-manager.ts`: systemd description
- `apps/daemon/src/whatsapp/WhatsAppService.ts`: Browser user agent string
- `apps/web/src/client/components/layout/Sidebar.tsx`: Logo alt text
- `apps/web/src/client/components/layout/SettingsDialog.tsx`: Logo alt text
- `apps/web/src/client/components/settings/providers/AccomplishAiProviderForm.tsx`: Provider display name and description
- `apps/web/src/client/components/settings/skills/SkillsFilterBar.tsx`: Translation key and label
- `apps/web/src/client/components/landing/PlusMenu/SkillsSubmenu.tsx`: Favicon import
- `apps/web/src/client/components/settings/skills/SkillCard.tsx`: Favicon import

### 5. i18n Translation Files

Bulk update all JSON files in `apps/web/locales/`:

- Replace `"Accomplish"` → `"Domework"`
- Replace `"accomplish"` → `"domework"` (in user-facing strings only)
- Update translation keys like `skills.byAccomplish` → `skills.byDomework`

### 6. Logo & Icon Assets

Copy assets from this skill's `assets/` folder to the project:

```bash
# Web assets
cp .qoder/skills/rebrand-accomplish-to-domework/assets/logo.png apps/web/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/logo-1.png apps/web/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/loading-symbol.svg apps/web/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/domework-favicon.png apps/web/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/domework-icon.png apps/web/public/assets/

# Desktop assets (same files)
cp .qoder/skills/rebrand-accomplish-to-domework/assets/logo.png apps/desktop/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/logo-1.png apps/desktop/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/loading-symbol.svg apps/desktop/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/domework-favicon.png apps/desktop/public/assets/
cp .qoder/skills/rebrand-accomplish-to-domework/assets/domework-icon.png apps/desktop/public/assets/

# Dock/taskbar icons
cp .qoder/skills/rebrand-accomplish-to-domework/assets/desktop-icon.png apps/desktop/resources/icon.png
cp .qoder/skills/rebrand-accomplish-to-domework/assets/desktop-icon.ico apps/desktop/resources/icon.ico
```

Then rename old Accomplish-branded files:

- `accomplish-favicon.png` → `domework-favicon.png`
- `accomplish-icon.png` → `domework-icon.png`

Update all imports referencing the old filenames.

### 7. Updater & Notification Text

Update in `apps/desktop/src/main/updater/`:

- `dialogs.ts`: Update dialog messages
- `listeners.ts`: Update notification text

### 8. Electron Name Patcher

Update `apps/desktop/scripts/patch-electron-name.cjs`:

- `APP_NAME = 'Domework'`
- Keep `URL_SCHEME = 'accomplish'` (do not change — breaks OAuth)

After changing, force re-patch the Electron binary's Info.plist or it will stay cached as "Accomplish".

### 9. Verify

Run these commands to validate:

```bash
# Type check all workspaces
pnpm typecheck

# Build web app
pnpm -F @domework/web build

# Build desktop app
pnpm -F @domework/desktop build
```

Fix any TypeScript errors that arise from the rebrand (e.g., optional `id` field in file attachments).

## Common Issues

**Menu bar still shows "Accomplish"**: The Electron Info.plist is cached. Force re-patch by editing `node_modules/electron/dist/Electron.app/Contents/Info.plist` directly, or delete and reinstall `node_modules/electron`.

**Dock icon still shows old logo**: macOS caches Dock icons. Right-click app → Options → Show in Finder → Get Info to verify. May need system restart for cache to clear.

**Logo not updating in UI**: Clear Vite cache (`rm -rf apps/web/node_modules/.vite`) and force reload (Cmd+Shift+R).

## Reference

For the complete list of files modified in a successful rebrand, see the git diff after applying this skill.
