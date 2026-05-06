import { motion } from 'framer-motion';
import type { ConnectedProvider, Tk9ByteplusCredentials } from '@accomplish_ai/agent-core';
import { ConnectedControls } from '../shared';
import { settingsVariants, settingsTransitions } from '@/lib/animations';

interface Tk9ByteplusConnectedSectionProps {
  connectedProvider: ConnectedProvider;
  onDisconnect: () => void;
  showModelError: boolean;
}

export function Tk9ByteplusConnectedSection({
  connectedProvider,
  onDisconnect,
  showModelError,
}: Tk9ByteplusConnectedSectionProps) {
  const tk9Credentials = connectedProvider.credentials as Tk9ByteplusCredentials | undefined;

  return (
    <motion.div
      key="connected"
      variants={settingsVariants.fadeSlide}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={settingsTransitions.enter}
      className="space-y-3"
    >
      <div className="space-y-3">
        <div>
          <label
            htmlFor="tk9-connected-base-url"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Base URL
          </label>
          <input
            id="tk9-connected-base-url"
            type="text"
            value={tk9Credentials?.baseUrl || ''}
            disabled
            className="w-full rounded-md border border-input bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground"
          />
        </div>
        {tk9Credentials?.hasApiKey && (
          <div>
            <label
              htmlFor="tk9-connected-api-key"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              API Key
            </label>
            <input
              id="tk9-connected-api-key"
              type="text"
              value={tk9Credentials?.keyPrefix || 'API key saved'}
              disabled
              className="w-full rounded-md border border-input bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="tk9-connected-model-name"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Model
          </label>
          <input
            id="tk9-connected-model-name"
            type="text"
            value={tk9Credentials?.modelName || ''}
            disabled
            className="w-full rounded-md border border-input bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground"
          />
        </div>
      </div>

      <ConnectedControls onDisconnect={onDisconnect} />

      {showModelError && !connectedProvider.selectedModelId && (
        <p className="text-sm text-destructive">Please reconnect to set a model</p>
      )}
    </motion.div>
  );
}
