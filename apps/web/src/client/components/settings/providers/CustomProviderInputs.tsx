import { ConnectButton, FormError } from '../shared';

interface CustomProviderInputsProps {
  baseUrl: string;
  apiKey: string;
  modelName: string;
  connecting: boolean;
  error: string | null;
  _onBaseUrlChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
  onConnect: () => void;
}

export function CustomProviderInputs({
  baseUrl,
  apiKey,
  modelName,
  connecting,
  error,
  _onBaseUrlChange,
  onApiKeyChange,
  onModelNameChange,
  onConnect,
}: CustomProviderInputsProps) {
  return (
    <>
      <div>
        <label htmlFor="custom-base-url" className="mb-2 block text-sm font-medium text-foreground">
          Base URL
        </label>
        <input
          id="custom-base-url"
          type="text"
          value={baseUrl}
          readOnly
          data-testid="custom-base-url"
          className="w-full rounded-md border border-input bg-muted px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-muted-foreground">Tokenine QWEN endpoint (fixed)</p>
      </div>

      <div>
        <label htmlFor="custom-api-key" className="mb-2 block text-sm font-medium text-foreground">
          API Key <span className="text-muted-foreground">(Optional)</span>
        </label>
        <div className="flex gap-2">
          <input
            id="custom-api-key"
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Optional API key"
            data-testid="custom-api-key"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm"
          />
          <button
            onClick={() => onApiKeyChange('')}
            className="rounded-md border border-border p-2.5 text-muted-foreground hover:text-foreground transition-colors"
            type="button"
            disabled={!apiKey}
            aria-label="Clear API key"
            title="Clear API key"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="custom-model-name"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Model Name
        </label>
        <input
          id="custom-model-name"
          type="text"
          value={modelName}
          onChange={(e) => onModelNameChange(e.target.value)}
          placeholder="qwen3.6-plus"
          data-testid="custom-model-name"
          className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Model ID as expected by the endpoint (default: qwen3.6-plus)
        </p>
      </div>

      <FormError error={error} />
      <ConnectButton onClick={onConnect} connecting={connecting} />
    </>
  );
}
