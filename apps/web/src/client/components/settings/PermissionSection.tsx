import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Shield, ShieldOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PermissionSectionProps {
  allowAll: boolean;
  onToggle: () => void;
}

export function PermissionSection({ allowAll, onToggle }: PermissionSectionProps) {
  const { t } = useTranslation('settings');

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 rounded-full p-1.5 ${allowAll ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}
          >
            {allowAll ? (
              <ShieldOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            ) : (
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="permission-mode" className="text-sm font-medium">
              {t('permissions.title')}
            </Label>
            <p className="text-xs text-muted-foreground">
              {allowAll ? t('permissions.descriptionAllowAll') : t('permissions.descriptionAsk')}
            </p>
          </div>
        </div>
        <Switch
          id="permission-mode"
          checked={allowAll}
          onCheckedChange={onToggle}
          className={allowAll ? 'data-[state=checked]:bg-amber-500' : ''}
        />
      </div>

      {allowAll && (
        <div className="flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-xs text-amber-800 dark:text-amber-300">{t('permissions.warning')}</p>
        </div>
      )}
    </div>
  );
}
