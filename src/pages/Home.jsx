import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import AppointmentCalendar from '../components/AppointmentCalendar';
import { 
  UserGroupIcon, 
  ClockIcon, 
  HeartIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });

  const features = [
    {
      name: 'Expert Doctors',
      description: 'Our team of experienced medical professionals is dedicated to providing the best care.',
      icon: UserGroupIcon,
    },
    {
      name: '24/7 Service',
      description: 'Round-the-clock medical assistance for emergencies and urgent care needs.',
      icon: ClockIcon,
    },
    {
      name: 'Quality Care',
      description: 'State-of-the-art facilities and personalized treatment plans for every patient.',
      icon: HeartIcon,
    },
    {
      name: 'Safe & Secure',
      description: 'Following strict health protocols to ensure your safety during visits.',
      icon: ShieldCheckIcon,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    toast.success('Appointment request submitted successfully!');
    setAppointmentForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      reason: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-32 px-6 rounded-3xl mb-12">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your Health Is Our Priority
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Experience world-class healthcare with our team of expert doctors. 
            Book your appointment today and take the first step towards better health.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#book-appointment"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book Appointment
            </a>
            <a href="#services" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for better health
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We offer comprehensive healthcare services tailored to your needs. Our experienced team
              ensures you receive the best medical care possible.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="book-appointment" className="py-16 bg-gray-50 rounded-3xl mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AppointmentCalendar
              onDateSelect={(date) => setAppointmentForm({ ...appointmentForm, date })}
            />
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Book Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="input-field w-full border px-3 py-2 rounded-md"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="input-field w-full border px-3 py-2 rounded-md"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    className="input-field w-full border px-3 py-2 rounded-md"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    className="input-field w-full border px-3 py-2 rounded-md"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                  <textarea
                    className="input-field w-full border px-3 py-2 rounded-md"
                    rows="3"
                    value={appointmentForm.reason}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-4 text-lg text-gray-600">
                Have questions? Our team is here to help. Contact us through any of these channels.
              </p>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="font-medium text-gray-900">Address</dt>
                  <dd className="mt-2 text-gray-600">
                    Shubh Clinic, MG Road<br />
                    Indore, Madhya Pradesh<br />
                    India - 452001
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Phone</dt>
                  <dd className="mt-2 text-gray-600">+91 98765 43210</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Email</dt>
                  <dd className="mt-2 text-gray-600">contact@shubhclinic.in</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Hours</dt>
                  <dd className="mt-2 text-gray-600">
                    Monday - Saturday: 9:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </dd>
                </div>
              </dl>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.009284260522!2d75.868425!3d22.719568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc95e8d7463d%3A0x686d2ffddf1e9922!2sM.G.%20Road%2C%20Indore!5e0!3m2!1sen!2sin!4v1681248347732"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
