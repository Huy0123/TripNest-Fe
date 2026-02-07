/**
 * Homepage Error State
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoadingError
        message="Failed to load homepage content"
        onRetry={reset}
      />
    </div>
  );
}
