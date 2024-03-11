'use client';

import {
  ALREADY_HAVE_ACCOUNT,
  BASE_URL,
  CREATE_ACCOUNT,
  PLEASE_ENTER_EMAIL,
  PLEASE_ENTER_PASSWORD,
  PLEASE_ENTER_USER_NAME,
  SIGN_IN,
  SIGN_UP,
  SIGN_UP_SUCCESSFUL,
  NAME,
  YOUR_EMAIL,
  YOUR_PASSWORD
} from '@/utils/common/common';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const SignupPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${BASE_URL}/user/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(SIGN_UP_SUCCESSFUL);
      setTimeout(() => {
        router.push('/sign-in');
      }, 1000);
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
                  {CREATE_ACCOUNT}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-8">
                    <label
                      htmlFor="username"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {NAME}{' '}
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'username is required',
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            placeholder={PLEASE_ENTER_USER_NAME}
                            className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                          />
                          {errors.name && (
                            <p className="mt-2 text-sm text-red-500">
                              {typeof errors.name.message === 'string'
                                ? errors.name.message
                                : null}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {YOUR_EMAIL}{' '}
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
                      {YOUR_PASSWORD}{' '}
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
                      {SIGN_UP}
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  {ALREADY_HAVE_ACCOUNT}{' '}
                  <Link href="/sign-in" className="text-primary hover:underline">
                    {SIGN_IN}
                    {''}
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
            <mask
              id="mask0_95:1005"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
