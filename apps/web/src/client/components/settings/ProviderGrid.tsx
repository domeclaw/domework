import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProviderId, ProviderSettings } from '@accomplish_ai/agent-core/common';
import { ProviderCard } from './ProviderCard';

// Provider order — only Custom Endpoint is shown
const PROVIDER_ORDER: ProviderId[] = ['custom'];

interface ProviderGridProps {
  settings: ProviderSettings;
  selectedProvider: ProviderId | null;
  onSelectProvider: (providerId: ProviderId) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
}

export function ProviderGrid({ settings, selectedProvider, onSelectProvider }: ProviderGridProps) {
  const { t } = useTranslation('settings');

  const filteredProviders = useMemo(() => {
    return PROVIDER_ORDER;
  }, []);

  return (
    <div className="rounded-xl border border-border bg-provider-bg p-4" data-testid="provider-grid">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">{t('providers.title')}</span>
      </div>

      {/* Providers */}
      <div className="grid grid-cols-4 gap-3 min-h-[110px] justify-items-center">
        {filteredProviders.map((providerId) => (
          <ProviderCard
            key={providerId}
            providerId={providerId}
            connectedProvider={settings?.connectedProviders?.[providerId]}
            isActive={settings?.activeProviderId === providerId}
            isSelected={selectedProvider === providerId}
            onSelect={onSelectProvider}
          />
        ))}
      </div>
    </div>
  );
}
