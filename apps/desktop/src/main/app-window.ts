/**
 * BrowserWindow creation and configuration.
 * Extracted from index.ts to keep main entry point under 200 lines.
 */
import { app, BrowserWindow, shell, nativeImage, nativeTheme, Menu, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLogCollector } from './logging';
import Store from 'electron-store';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize electron-store for persisting window state
const store = new Store<{
  windowBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
    isMaximized?: boolean;
  };
}>();

function logMain(level: 'INFO' | 'WARN' | 'ERROR', msg: string) {
  try {
    const l = getLogCollector();
    if (l?.log) {
      l.log(level, 'main', msg);
    }
  } catch (_e) {
    /* best-effort logging */
  }
}

function getPreloadPath(): string {
  return path.join(__dirname, '../preload/index.cjs');
}

/**
 * Create and configure the main application BrowserWindow.
 * Returns the created window.
 */
export function createMainWindow(opts: {
  ROUTER_URL: string | undefined;
  WEB_DIST: string;
}): BrowserWindow {
  logMain('INFO', '[Main] Creating main application window');
  const iconFile = process.platform === 'win32' ? 'icon.ico' : 'icon.png';
  const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, iconFile)
    : path.join(process.env.APP_ROOT!, 'resources', iconFile);
  const icon = nativeImage.createFromPath(iconPath);
  if (process.platform === 'darwin' && app.dock && !icon.isEmpty()) {
    app.dock.setIcon(icon);
  }

  const preloadPath = getPreloadPath();
  logMain('INFO', `[Main] Using preload script: ${preloadPath}`);

  // Restore window bounds from previous session
  const savedBounds = store.get('windowBounds');
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Domework',
    icon: icon.isEmpty() ? undefined : icon,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#171717' : '#f9f9f9',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: true,
    },
  };

  // Apply saved bounds if available and valid
  if (savedBounds) {
    // Verify that saved bounds are within current display bounds
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

    if (
      savedBounds.x >= 0 &&
      savedBounds.y >= 0 &&
      savedBounds.x + savedBounds.width <= screenWidth + 100 &&
      savedBounds.y + savedBounds.height <= screenHeight + 100 &&
      savedBounds.width >= 900 &&
      savedBounds.height >= 600
    ) {
      windowOptions.x = savedBounds.x;
      windowOptions.y = savedBounds.y;
      windowOptions.width = savedBounds.width;
      windowOptions.height = savedBounds.height;
      logMain(
        'INFO',
        `[Main] Restored window bounds: ${savedBounds.width}x${savedBounds.height} at ${savedBounds.x},${savedBounds.y}`,
      );
    } else {
      logMain('INFO', '[Main] Saved window bounds out of range, using defaults');
    }
  }

  const mainWindow = new BrowserWindow(windowOptions);

  mainWindow.webContents.on('context-menu', (_event, params) => {
    if (!params.misspelledWord) {
      return;
    }
    const items: Electron.MenuItemConstructorOptions[] = [
      ...params.dictionarySuggestions.map((s) => ({
        label: s,
        click: () => mainWindow.webContents.replaceMisspelling(s),
      })),
      ...(params.dictionarySuggestions.length > 0 ? [{ type: 'separator' as const }] : []),
      {
        label: 'Add to Dictionary',
        click: () =>
          mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord),
      },
    ];
    Menu.buildFromTemplate(items).popup();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Save window bounds when resized or moved
  const saveBounds = () => {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', {
      ...bounds,
      isMaximized: mainWindow.isMaximized(),
    });
  };

  mainWindow.on('resize', saveBounds);
  mainWindow.on('move', saveBounds);
  mainWindow.on('close', saveBounds);

  // Restore maximized state if it was maximized when closed
  if (savedBounds?.isMaximized) {
    mainWindow.maximize();
    logMain('INFO', '[Main] Restored maximized state');
  }

  const isE2EMode = (global as Record<string, unknown>).E2E_SKIP_AUTH === true;
  if (!app.isPackaged && !isE2EMode && process.env.NODE_ENV !== 'test') {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }

  // dev mode needs 'unsafe-inline' for @vitejs/plugin-react HMR preamble (never distributed)
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const scriptSrc = app.isPackaged ? "'self'" : "'self' 'unsafe-inline'";
    const csp = `default-src 'self' https:; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https: ws: wss:; font-src 'self' https: data:; worker-src 'self' blob:`;
    callback({ responseHeaders: { ...details.responseHeaders, 'Content-Security-Policy': [csp] } });
  });

  if (opts.ROUTER_URL) {
    logMain('INFO', `[Main] Loading from router URL: ${opts.ROUTER_URL}`);
    mainWindow.loadURL(opts.ROUTER_URL);
  } else {
    const indexPath = path.join(opts.WEB_DIST, 'index.html');
    logMain('INFO', `[Main] Loading from file: ${indexPath}`);
    mainWindow.loadFile(indexPath);
  }

  return mainWindow;
}
