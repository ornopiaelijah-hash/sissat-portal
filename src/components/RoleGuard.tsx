/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { profile, isCheckingAuth } = useStudent();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-secondary animate-spin" />
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
            Verifying Credentials
          </p>
        </div>
      </div>
    );
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
