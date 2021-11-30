import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';

export const CreateBoard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const createBoard = async (data) => {
    const newBoard = await fetch('/api/board/create', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });
    return await newBoard.json();
  };

  const mutation = useMutation(createBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
    },
  });

  const onSubmit = async (data) => {
    try {
      mutation.mutate(data);
      setOpen(false);
    } catch (error) {}
  };

  // if (mutation.isSuccess) setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
      <Dialog.Trigger className="btn max-w-xs">
        Create a new board
      </Dialog.Trigger>
      <Dialog.Overlay className="bg-gray-900 opacity-50 fixed inset-0" />
      <Dialog.Content className="fixed bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 p-5 max-w-sm w-full">
        <Dialog.Title className="text-xl mb-2 font-medium">
          Create a new board
        </Dialog.Title>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errors.title && (
            <span className="text-sm mb-1 text-red-500">
              A board must have a title
            </span>
          )}
          <input
            className={`rounded-lg shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-5 ${
              errors.title && 'border-red-500'
            }`}
            {...register('title', { required: true })}
            type="text"
            placeholder="title"
          />
          <input
            className={`rounded-lg shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-5`}
            {...register('description')}
            type="text"
            placeholder="description"
          />
          <button type="submit" className="btn">
            {mutation.isLoading ? 'Working on it...' : 'Create'}
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
