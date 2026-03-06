import { STATUS_STEPS, STATUS_LABELS } from '@/lib/utils';

interface StatusPipelineProps {
  currentStatus: string;
  compact?: boolean;
}

export default function StatusPipeline({ currentStatus, compact = false }: StatusPipelineProps) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus as typeof STATUS_STEPS[number]);
  const isTerminal = currentStatus === 'vetoed' || currentStatus === 'dead';

  const circleSize = compact ? 'w-5 h-5 text-[9px]' : 'w-8 h-8 text-xs';
  const connectorWidth = compact ? 'w-4' : 'w-8';
  const connectorMarginTop = compact ? 'mt-[-12px]' : 'mt-[-16px]';
  const labelStyle = compact ? 'text-[8px] max-w-[48px]' : 'text-[10px] max-w-[80px]';

  return (
    <div>
      {/* Desktop - horizontal */}
      <div className="hidden sm:flex items-center gap-0">
        {STATUS_STEPS.map((step, index) => {
          const isActive = index <= currentIndex && !isTerminal;
          const isCurrent = index === currentIndex && !isTerminal;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`${circleSize} rounded-full flex items-center justify-center font-ui font-bold ${
                    isActive
                      ? isCurrent
                        ? 'bg-amber text-white'
                        : 'bg-navy text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isActive && !isCurrent ? '\u2713' : index + 1}
                </div>
                <span
                  className={`mt-1 ${labelStyle} font-ui text-center ${
                    isActive ? 'text-text font-semibold' : 'text-gray-400'
                  }`}
                >
                  {STATUS_LABELS[step]}
                </span>
              </div>
              {index < STATUS_STEPS.length - 1 && (
                <div
                  className={`${connectorWidth} h-0.5 mx-0.5 ${connectorMarginTop} ${
                    index < currentIndex && !isTerminal ? 'bg-navy' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile - vertical */}
      <div className="sm:hidden space-y-2">
        {STATUS_STEPS.map((step, index) => {
          const isActive = index <= currentIndex && !isTerminal;
          const isCurrent = index === currentIndex && !isTerminal;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-ui font-bold shrink-0 ${
                  isActive
                    ? isCurrent
                      ? 'bg-amber text-white'
                      : 'bg-navy text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isActive && !isCurrent ? '\u2713' : index + 1}
              </div>
              <span
                className={`text-sm font-ui ${
                  isActive ? 'text-text font-semibold' : 'text-gray-400'
                }`}
              >
                {STATUS_LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Terminal status badge */}
      {isTerminal && (
        <div className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-ui font-semibold ${
          currentStatus === 'vetoed' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {STATUS_LABELS[currentStatus]}
        </div>
      )}
    </div>
  );
}
