/**
 * Tours Error State
 */

'use client';

import { LoadingError } from '@/components/ui/error-state';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <LoadingError
        message={error.message || 'Failed to load tours'}
        onRetry={reset}
      />
    </div>
  );
}
