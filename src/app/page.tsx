'use client';

import { useState } from 'react';
import { initialUsers } from '@/lib/data';
import type { User, AddUserFormValues } from '@/lib/types';
import AddUserForm from '@/components/add-user-form';
import UserList from '@/components/user-list';
import PageHeader from '@/components/page-header';

export default function Home() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleAddUser = (data: AddUserFormValues) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      timeout: 1200, // Default timeout
      ...data,
      macAddress: data.macAddress || null,
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <PageHeader />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <AddUserForm onAddUser={handleAddUser} />
          </div>
          <div className="lg:col-span-3">
            <UserList users={users} onDeleteUser={handleDeleteUser} />
          </div>
        </div>
      </main>
    </div>
  );
}
