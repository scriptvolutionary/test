import z from 'zod'

import { vMsg } from './messages'

export const emailSchema = z.string().trim().min(1, vMsg.required).email(vMsg.emailInvalid)

export const passwordSchema = z.string().min(1, vMsg.required).min(8, vMsg.passwordMin8)
