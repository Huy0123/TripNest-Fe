/**
 * Forgot Password Page
 */

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { requestPasswordResetAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/ui/error-state';
import Link from 'next/link';
import { Mail } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full"
      isLoading={pending}
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Send Reset Link'}
    </Button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordResetAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
            <Mail className="icon-lg text-primary-600" />
          </div>
          <h1 className="header-03-bold text-grey-900 mb-2">Forgot Password?</h1>
          <p className="body-01-regular text-grey-600">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          {state?.success ? (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="header-06-bold text-grey-900">Check your email</h2>
              <p className="body-02-regular text-grey-600">
                We've sent password reset instructions to your email
              </p>
              <Link
                href="/signin"
                className="inline-block mt-4 body-02-medium text-primary-600 hover:text-primary-700"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            /* Form State */
            <form action={formAction} className="space-y-6">
              {state?.error && (
                <FormError message={state.error} />
              )}

              <Input
                label="Email Address"
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                autoComplete="email"
              />

              <SubmitButton />

              <Link
                href="/signin"
                className="block text-center body-02-medium text-grey-700 hover:text-grey-900 transition-colors"
              >
                Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
