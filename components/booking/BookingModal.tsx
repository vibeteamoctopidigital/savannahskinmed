'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import { CloseIcon } from '@/components/icons';
import { footerServices } from '@/lib/site';
import { submitBooking } from '@/app/actions/submissions';

const LOCATIONS = ['Pooler / Savannah', 'Statesboro'];

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

function Field({
  id,
  label,
  type = 'text',
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        required
        className="w-full rounded-lg border border-white/45 bg-transparent px-6 py-[18px] font-sans text-[16px] text-white outline-none transition placeholder:text-white/90 focus:border-white focus:bg-white/10"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative rounded-lg border border-white/45 px-6 pb-[13px] pt-[11px] transition focus-within:border-white">
      <label
        htmlFor={id}
        className="block font-sans text-[11px] font-extrabold uppercase tracking-[0.03em] text-white"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        required
        defaultValue={placeholder ? '' : options[0]}
        className="w-full appearance-none bg-transparent pr-6 font-sans text-[16px] text-white outline-none"
      >
        {placeholder && (
          <option value="" className="bg-navy text-white">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option} className="bg-navy text-white">
            {option}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18px] right-6 border-x-[5px] border-t-[6px] border-x-transparent border-t-white"
      />
    </div>
  );
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [stepOneData, setStepOneData] = useState<FormData | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Lock the page behind the dialog and restore focus handling.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep focus inside the dialog.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  // Start clean each time the dialog is reopened.
  useEffect(() => {
    if (!open) {
      setStep(1);
      setSent(false);
      setError(null);
      setStepOneData(null);
    }
  }, [open]);

  if (!open || !mounted) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 1) {
      setStepOneData(new FormData(event.currentTarget));
      setStep(2);
      return;
    }

    setError(null);
    setSubmitting(true);
    const stepTwoData = new FormData(event.currentTarget);
    const merged = new FormData();
    stepOneData?.forEach((value, key) => merged.set(key, value));
    stepTwoData.forEach((value, key) => merged.set(key, value));

    const result = await submitBooking(merged);
    setSubmitting(false);
    if (result.ok) {
      setSent(true);
    } else {
      setError(result.error);
    }
  };

  // Portalled to <body>: hero/reveal ancestors carry a CSS transform, which
  // would otherwise become the containing block for this fixed overlay.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-8 backdrop-blur-md sm:py-12"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative w-full max-w-[600px] rounded-2xl bg-navy px-6 pb-12 pt-16 shadow-menu sm:px-14"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
          className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/25 text-white transition-colors hover:bg-white/40"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <h2 id="booking-title" className="display-3 text-center text-white">
          Book Appointment
        </h2>

        {sent ? (
          <div className="mt-10 text-center">
            <p className="text-[16px] leading-[1.8] text-white">
              Thank you — your request has been received. Our team will contact you shortly to
              confirm your appointment.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-full bg-teal px-8 py-[19px] font-sans text-[14px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-teal-dark"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-9 space-y-4">
            {step === 1 ? (
              <>
                <Field id="name" label="Name" autoComplete="name" />
                <Field id="email" label="E-mail Address" type="email" autoComplete="email" />
                <Field id="phone" label="Phone" type="tel" autoComplete="tel" />

                <SelectField
                  id="location"
                  label="Which location are you interested in?"
                  options={LOCATIONS}
                />

                <SelectField
                  id="service"
                  label="Service:"
                  placeholder="Choose A Service"
                  options={footerServices.map((service) => service.label)}
                />
              </>
            ) : (
              <>
                <Field id="preferredDate" label="Preferred Date" type="date" />
                <Field id="preferredTime" label="Preferred Time" type="time" />

                <div>
                  <label htmlFor="notes" className="sr-only">
                    Anything we should know?
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Anything we should know?"
                    className="w-full resize-y rounded-lg border border-white/45 bg-transparent px-6 py-[18px] font-sans text-[16px] text-white outline-none transition placeholder:text-white/90 focus:border-white focus:bg-white/10"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-[13px] uppercase tracking-widest2 text-white/80 underline underline-offset-4 transition-colors hover:text-white"
                >
                  Back
                </button>
              </>
            )}

            {error && (
              <p role="alert" className="text-[13px] text-rose-light">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="!mt-8 w-full rounded-full bg-teal px-8 py-[19px] font-sans text-[15px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
            >
              {submitting ? 'Sending…' : step === 1 ? 'Next Step' : 'Request Appointment'}
            </button>
          </form>
        )}

        <hr className="mt-12 border-white/25" />

        <p className="mt-7 font-sans text-[12px] uppercase leading-[1.55] tracking-[0.01em] text-white/70">
          By completing and submitting this form, I hereby provide explicit written consent to
          receive communications through text messages and phone calls, including those to
          wireless numbers or numbers registered on an internal do not call registry. I
          acknowledge that these communications may be initiated through telephone calls,
          prerecorded voicemails, or postal mail, and may pertain to marketing services. I
          understand that such communications might involve automated software. Additionally, I
          affirm my understanding and acceptance of the privacy policy and terms and conditions. I
          am aware that I can opt out of these communications at any time by replying with
          &ldquo;stop&rdquo;. Standard message and data rates may apply.
        </p>
      </div>
    </div>,
    document.body,
  );
}
