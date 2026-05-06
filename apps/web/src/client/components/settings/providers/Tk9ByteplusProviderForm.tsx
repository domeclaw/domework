import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ConnectedProvider, Tk9ByteplusCredentials } from '@accomplish_ai/agent-core';
import { ProviderFormHeader } from '../shared';
import { settingsVariants, settingsTransitions } from '@/lib/animations';
import { getAccomplish } from '@/lib/accomplish';
import {
  TK9_BYTEPLUS_DEFAULT_BASE_URL,
  TK9_BYTEPLUS_DEFAULT_MODEL,
} from '@accomplish_ai/agent-core/common';
import { Tk9ByteplusConnectedSection } from './Tk9ByteplusConnectedSection';
import { Tk9ByteplusProviderInputs } from './Tk9ByteplusProviderInputs';

import tk9Logo from '/assets/ai-logos/custom.svg';

interface Tk9ByteplusProviderFormProps {
  connectedProvider?: ConnectedProvider;
  onConnect: (provider: ConnectedProvider) => void;
  onDisconnect: () => void;
  onModelChange: (modelId: string) => void;
  showModelError: boolean;
}

export function Tk9ByteplusProviderForm({
  connectedProvider,
  onConnect,
  onDisconnect,
  onModelChange: _onModelChange,
  showModelError,
}: Tk9ByteplusProviderFormProps) {
  const [baseUrl] = useState(TK9_BYTEPLUS_DEFAULT_BASE_URL);
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState(TK9_BYTEPLUS_DEFAULT_MODEL);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConnected = connectedProvider?.connectionStatus === 'connected';

  const handleConnect = async () => {
    if (!modelName.trim()) {
      setError('Model name is required');
      return;
    }

    setConnecting(true);
    setError(null);

    try {
      const accomplish = getAccomplish();
      const trimmedKey = apiKey.trim() || undefined;

      const result = await accomplish.testCustomConnection(baseUrl.trim(), trimmedKey);
      if (!result.success) {
        setError(result.error || 'Connection failed');
        setConnecting(false);
        return;
      }

      if (trimmedKey) {
        await accomplish.addApiKey('tk9-byteplus', trimmedKey);
      } else {
        await accomplish.removeApiKey('tk9-byteplus');
      }

      const fullModelId = `tk9-byteplus/${modelName.trim()}`;

      const provider: ConnectedProvider = {
        providerId: 'tk9-byteplus',
        connectionStatus: 'connected',
        selectedModelId: fullModelId,
        credentials: {
          type: 'tk9-byteplus',
          baseUrl: baseUrl.trim(),
          modelName: modelName.trim(),
          hasApiKey: !!trimmedKey,
          keyPrefix: trimmedKey ? '••••' + trimmedKey.slice(-4) : undefined,
        } as Tk9ByteplusCredentials,
        lastConnectedAt: new Date().toISOString(),
        availableModels: [{ id: fullModelId, name: modelName.trim() }],
      };

      onConnect(provider);
      setApiKey('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div
      className="rounded-xl border border-border bg-card p-5"
      data-testid="tk9-byteplus-provider-settings-panel"
    >
      <ProviderFormHeader logoSrc={tk9Logo} providerName="Tokenine Byteplus" />

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div
              key="disconnected"
              variants={settingsVariants.fadeSlide}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={settingsTransitions.enter}
              className="space-y-3"
            >
              <Tk9ByteplusProviderInputs
                baseUrl={baseUrl}
                apiKey={apiKey}
                modelName={modelName}
                connecting={connecting}
                error={error}
                onApiKeyChange={setApiKey}
                onModelNameChange={setModelName}
                onConnect={handleConnect}
              />
            </motion.div>
          ) : (
            <Tk9ByteplusConnectedSection
              connectedProvider={connectedProvider!}
              onDisconnect={onDisconnect}
              showModelError={showModelError}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
