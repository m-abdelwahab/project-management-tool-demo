import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';

export const InviteMember = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const inviteMember = async (email: string) =>
    fetch('/api/invite', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      method: 'POST',
    }).then((res) => res.json());

  const mutation = useMutation(inviteMember, {
    onSuccess: () => {
      queryClient.invalidateQueries('members');
    },
  });

  const onSubmit = async ({ email }) => {
    try {
      mutation.mutate(email);
      setOpen(false);
    } catch (error) {}
  };

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
      <Dialog.Trigger className="btn max-w-xs">
        Invite Team Member
      </Dialog.Trigger>
      <Dialog.Overlay className="bg-gray-900 opacity-50 fixed inset-0" />
      <Dialog.Content className="fixed bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 p-5 max-w-sm w-full">
        <Dialog.Title className="text-xl mb-2 font-medium">
          Invite other team members to your project
        </Dialog.Title>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errors.email && (
            <span className="text-sm mb-1 text-red-500">
              You must provide an email
            </span>
          )}
          <input
            className={`rounded-lg shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-5 ${
              errors.email && 'border-red-500'
            }`}
            {...register('email', { required: true })}
            type="email"
          />
          <button type="submit" className="btn">
            {mutation.isLoading ? 'Working on it...' : 'Invite'}
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
