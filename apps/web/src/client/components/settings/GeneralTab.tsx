import { useTranslation } from 'react-i18next';
import { NotificationsSection } from '@/components/settings/NotificationsSection';
import { PermissionSection } from '@/components/settings/PermissionSection';
import { DebugSection } from '@/components/settings/DebugSection';
import { DaemonSection } from '@/components/settings/DaemonSection';
import { ThemeSelector } from '@/components/settings/ThemeSelector';
import { LanguageSelector } from '@/components/settings/LanguageSelector';

interface GeneralTabProps {
  notificationsEnabled: boolean;
  onNotificationsToggle: () => void;
  permissionMode: 'ask' | 'allow_all';
  onPermissionModeToggle: () => void;
  debugMode: boolean;
  onDebugToggle: () => void;
}

export function GeneralTab({
  notificationsEnabled,
  onNotificationsToggle,
  permissionMode,
  onPermissionModeToggle,
  debugMode,
  onDebugToggle,
}: GeneralTabProps) {
  const { t } = useTranslation('settings');

  return (
    <div className="space-y-6">
      <ThemeSelector />
      <LanguageSelector />

      <section>
        <NotificationsSection enabled={notificationsEnabled} onToggle={onNotificationsToggle} />
      </section>

      <section>
        <PermissionSection
          allowAll={permissionMode === 'allow_all'}
          onToggle={onPermissionModeToggle}
        />
      </section>

      <section>
        <DaemonSection />
      </section>

      <section>
        <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
          {t('developer.title')}
        </h4>
        <DebugSection debugMode={debugMode} onDebugToggle={onDebugToggle} />
      </section>
    </div>
  );
}
