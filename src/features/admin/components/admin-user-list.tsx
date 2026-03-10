'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { SearchMd } from '@untitledui/icons';
import dayjs from 'dayjs';

import { useAdminUsers } from '@/features/admin/api/admin-users.queries';
import { Pagination } from './pagination';
import type { AdminUser } from '@/features/admin/types/admin.types';

const TABLE_COLUMNS = [
  { key: 'no', label: 'No' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Nomor Handphone' },
  { key: 'email', label: 'Email' },
  { key: 'createdAt', label: 'Created at' },
] as const;

/**
 * Renders a single user as a mobile card with label-value rows.
 */
function UserMobileCard({
  user,
  index,
}: Readonly<{ user: AdminUser; index: number }>) {
  return (
    <div className='card'>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-semibold tracking-tight'>No</span>
        <span className='text-sm font-semibold tracking-tight'>{index}</span>
      </div>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-semibold tracking-tight'>Name</span>
        <span className='text-sm font-semibold tracking-tight'>
          {user.name}
        </span>
      </div>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-semibold tracking-tight'>Email</span>
        <span className='text-sm font-bold tracking-tight'>{user.email}</span>
      </div>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-semibold tracking-tight'>
          Nomor Handphone
        </span>
        <span className='text-sm font-bold tracking-tight'>
          {user.phone ?? '-'}
        </span>
      </div>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-semibold tracking-tight'>Created at</span>
        <span
          className='text-sm font-bold tracking-tight'
          suppressHydrationWarning
        >
          {dayjs(user.createdAt).format('DD MMM YYYY, HH:mm')}
        </span>
      </div>
    </div>
  );
}

/**
 * Admin user list component with responsive table (desktop) / card (mobile).
 */
export function AdminUserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useAdminUsers(currentPage);

  const users = data?.users ?? [];
  const pagination = data?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  // Client-side search filter
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      (user.phone?.toLowerCase().includes(lowerQuery) ?? false)
    );
  });

  /** Row number accounting for page offset. */
  function getRowNumber(index: number): number {
    return (pagination.page - 1) * pagination.limit + index + 1;
  }

  return (
    <div className='flex flex-col gap-5 md:gap-6'>
      {/* Search Bar */}
      <div className='border-input bg-card flex h-10 w-full max-w-136 items-center gap-2 rounded-full border ps-3 pe-3 md:h-12 md:ps-4 md:pe-4'>
        <SearchMd
          size={18}
          className='text-muted-foreground shrink-0 md:size-4.5'
        />
        <input
          type='text'
          placeholder='Search user'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='text-sm-bold placeholder:text-sm-regular text-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none'
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className='flex flex-col gap-4'>
          {['skel-u1', 'skel-u2', 'skel-u3'].map((id) => (
            <div
              key={id}
              className='border-border bg-muted/30 h-16 animate-pulse rounded-xl border'
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {isLoading === false && filteredUsers.length === 0 && (
        <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-14'>
          <Icon
            icon='ri:user-line'
            className='text-muted-foreground size-12 opacity-50'
          />
          <p className='text-muted-foreground font-medium'>
            {searchQuery ? 'No matching users found.' : 'No users yet.'}
          </p>
        </div>
      )}

      {/* Desktop Table */}
      {isLoading === false && filteredUsers.length > 0 && (
        <>
          <div className='border-border bg-background shadow-card hidden overflow-hidden rounded-xl border md:block dark:border dark:shadow-none'>
            <table className='w-full'>
              <thead>
                <tr className='bg-secondary'>
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className='text-foreground px-4 py-4 text-start text-sm font-bold tracking-tight'
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={`user-row-${user.id}`}
                    className='border-border border-b last:border-b-0'
                  >
                    <td className='text-foreground px-4 py-4 text-base font-semibold tracking-tight'>
                      {getRowNumber(index)}
                    </td>
                    <td className='text-foreground px-4 py-4 text-base font-semibold tracking-tight'>
                      {user.name}
                    </td>
                    <td className='text-foreground px-4 py-4 text-base font-semibold tracking-tight'>
                      {user.phone ?? '-'}
                    </td>
                    <td className='text-foreground px-4 py-4 text-base font-semibold tracking-tight'>
                      {user.email}
                    </td>
                    <td
                      className='text-foreground px-4 py-4 text-base font-semibold tracking-tight'
                      suppressHydrationWarning
                    >
                      {dayjs(user.createdAt).format('DD MMM YYYY, HH:mm')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination inside table card on desktop */}
            {pagination.totalPages > 1 && (
              <div className='border-border border-t px-4 py-4'>
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  limit={pagination.limit}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className='flex flex-col gap-4 md:hidden'>
            {filteredUsers.map((user, index) => (
              <UserMobileCard
                key={`user-card-${user.id}`}
                user={user}
                index={getRowNumber(index)}
              />
            ))}

            {/* Pagination on mobile */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                limit={pagination.limit}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
