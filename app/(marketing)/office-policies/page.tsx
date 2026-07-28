import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/office-policies');
}

export default function OfficePoliciesPage() {
  return (
    <>
      <PageJsonLd route="/office-policies" />
      <PageHero
        title="Office Policies"
        intro="A few things worth knowing before your visit, so your appointment runs smoothly."
        image="/images/banner-13-bg.jpg"
        imageAlt="Savannah Age Management Medicine"
        position="center 40%"
      />

      <section className="section bg-white">
        <div className="shell-narrow">
          <Reveal className="mx-auto max-w-[760px] text-[15px] leading-[1.9]">
            <h2 className="font-sans text-[15px] font-bold text-navy">
              Savannah Age Management Medicine Office Policies
            </h2>
            <p className="mt-4 mb-8">
              Welcome to Savannah Age Management Medicine. To ensure we provide the best possible
              care and a seamless experience for all our clients, we have established the
              following office policies. We kindly ask that you take a moment to familiarize
              yourself with these guidelines concerning your appointments and our services. These
              policies are designed to help our practice run efficiently and to ensure we can
              provide timely, high-quality care to all our patients. Thank you for your
              cooperation and for helping us maintain a respectful and organized environment for
              everyone.
            </p>

            <h3 className="font-sans text-[15px] font-bold text-navy">
              Cancellation &amp; Missed Appointment Policy
            </h3>
            <p className="mt-4 mb-6">
              Our goal is to provide quality health care to all our patients in a timely manner.
              We understand that sometimes, unexpected delays can occur, making schedule
              adjustments.{' '}
              <strong className="font-bold text-navy">
                If you need to cancel your appointment, we respectfully request at least two
                business days&rsquo; notice.
              </strong>{' '}
              This will allow another patient access to that appointment time.
            </p>
            <p className="mb-8">
              When you book your appointment, you are holding a space on our calendar that is no
              longer available to our other patients. Please be aware of our policy regarding
              missed appointments. No-shows, late arrivals, and cancellations inconvenience not
              only our providers but our other patients as well.
            </p>

            <h3 className="font-sans text-[15px] font-bold text-navy">
              How to Cancel Your Appointment
            </h3>
            <p className="mt-4 mb-4">
              To cancel your appointment, please contact us between the hours of 9:30 a.m. and
              5:00 p.m. EST, Monday to Friday. You may contact us in the following ways:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>
                <strong className="font-bold text-navy">Phone:</strong> Call our clinic at{' '}
                <a href={site.phoneHref} className="text-rose-deep underline underline-offset-2">
                  {site.phone.replace(/[()]/g, '').replace(' ', '-')}
                </a>
                . If necessary, you may leave a detailed voicemail message.
              </li>
              <li>
                <strong className="font-bold text-navy">Text:</strong> Send a message to{' '}
                <a href={site.phoneHref} className="text-rose-deep underline underline-offset-2">
                  {site.phone.replace(/[()]/g, '').replace(' ', '-')}
                </a>{' '}
                or reply to one of the automated appointment reminders.
              </li>
              <li>
                <strong className="font-bold text-navy">Email:</strong> Send an email to{' '}
                <a href={site.emailHref} className="text-rose-deep underline underline-offset-2">
                  {site.email}
                </a>{' '}
                with your full name and the appointment details you wish to cancel.
              </li>
            </ul>
            <p className="mb-8">
              Cancellations submitted outside of our regular business hours will be considered
              received at the start of the next business day.
            </p>

            <h3 className="font-sans text-[15px] font-bold text-navy">Appointment Reminders</h3>
            <p className="mt-4 mb-8">
              To help you remember your scheduled time, we will send three reminders via text and
              email. These reminders are sent when the appointment is first created, three days
              before, and one day prior to your appointment.
            </p>

            <h3 className="font-sans text-[15px] font-bold text-navy">
              Late Cancellations &amp; No-Shows
            </h3>
            <p className="mt-4">
              A cancellation is considered late when the appointment is canceled less than two
              business days before the scheduled time. A &ldquo;no-show&rdquo; is when a patient
              misses an appointment without canceling. Patients with two or more late
              cancellations or no-shows within a 12-month period will be required to prepay for
              any future appointments. We understand that true emergencies may arise, and
              exceptions to this policy can be made at the discretion of clinic management.
            </p>

            <div className="mt-10">
              <ButtonLink href="/contact-us">Contact The Office</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
