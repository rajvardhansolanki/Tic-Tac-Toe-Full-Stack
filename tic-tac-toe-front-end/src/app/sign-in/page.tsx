'use client';

import {
  BASE_URL,
  HAVE_ACCOUNT,
  LOGIN_SUCCESSFUL,
  PLEASE_ENTER_EMAIL,
  PLEASE_ENTER_PASSWORD,
  SIGN_IN,
  SIGN_UP,
  YOUR_EMAIL,
  YOUR_PASSWORD,
} from '@/utils/common/common';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const SigninPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, data);
      const token = response.data.user.access_token;
      const userId = response.data.user._id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      alert(LOGIN_SUCCESSFUL);
      router.push('/tic-tac-toe-board');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {SIGN_IN}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {YOUR_EMAIL}
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: { value: true, message: 'Email is required' },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email address',
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="email"
                            placeholder={PLEASE_ENTER_EMAIL}
                            className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-500">
                              {typeof errors.email.message === 'string'
                                ? errors.email.message
                                : null}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {YOUR_PASSWORD}
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Password is required',
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="password"
                            placeholder={PLEASE_ENTER_PASSWORD}
                            className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                          />
                          {errors.password && (
                            <p className="mt-2 text-sm text-red-500">
                              {typeof errors.password.message === 'string'
                                ? errors.password.message
                                : null}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    >
                      {SIGN_IN}
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  {HAVE_ACCOUNT}{' '}
                  <Link href="/sign-up" className="text-primary hover:underline">
                    {SIGN_UP}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* The rest of your SVG code remains unchanged */}
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
