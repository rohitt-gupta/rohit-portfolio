"use server"

import ContactFormEmail from '@/emails/contact-form-email';
import { getErrorMessage, validateString } from '@/lib/utils';
import React from 'react';
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)


export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid Sender Email"
    }
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid Message"
    }
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form<onboarding@resend.dev>",
      to: "pta.rohit28@gmail.com",
      subject: "Message from portfolio contact form",
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string
      })
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error)
    }
  }
  return {
    data,
  }

}