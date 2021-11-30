import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const SSO = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      const res = await fetch('/api/auth/sso', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: 'POST',
      });
      const { authorizationUrl } = await res.json();

      window.location.replace(authorizationUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const mutation = useMutation(login, {});

  const onSubmit = async (data) => {
    try {
      mutation.mutate(data);
    } catch (error) {}
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to Epic Board
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="py-8 px-4 sm:px-10 max-w-sm mx-auto">
          <form
            className="flex flex-col mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            {errors.email && (
              <span className="text-sm mb-1 text-red-500">
                You must provide an email
              </span>
            )}
            <input
              className={`rounded-lg px-4 py-3 shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50${
                errors.email && 'border-2 border-red-500'
              }`}
              {...register('email', { required: true })}
              type="email"
              placeholder="company email"
              autoComplete="off"
            />

            <button
              className="flex justify-center items-center mt-5 mx-auto w-full border-gray-300 border-solid border-2 hover:text-white hover:bg-gray-900 rounded-md px-4 py-3 space-x-2"
              type="submit"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{'Continue with SAML SSO'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SSO;
