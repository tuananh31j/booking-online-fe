/* eslint-disable no-unused-vars */
import { z } from 'zod';

export const createFormSchemaLogin = (t: (key: string) => string) => {
    return z.object({
        email: z
            .string({ required_error: t('validations.email.required') })
            .email({ message: t('validations.email.type') }),
        password: z
            .string({ required_error: t('validations.password.required') })
            .min(6, { message: t('validations.password.min_length') }),
        rememberMe: z.boolean(),
    });
};
