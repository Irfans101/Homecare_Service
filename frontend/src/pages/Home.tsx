import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FaHospital,
  FaSyringe,
  FaUserFriends,
  FaWalking,
  FaVial,
  FaHeartbeat,
  FaUsers,
  FaPhone,
  FaUserMd,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaTrophy,
  FaClipboardList,
  FaHome as FaHomeIcon,
  FaMoneyBillWave,
  FaHeart,
} from 'react-icons/fa';

const Home = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceRequired: 'Home Nursing Care',
    patientCondition: '',
    location: '',
    preferredTime: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [quickStatus, setQuickStatus] = useState('');
  const [quickCollapsed, setQuickCollapsed] = useState(false);
  const [quickSuccess, setQuickSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!API_BASE) {
        setSubmitStatus('Server not configured. Contact the site administrator.');
        return;
      }

      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('Booking request submitted successfully!');
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          serviceRequired: 'Home Nursing Care',
          patientCondition: '',
          location: '',
          preferredTime: ''
        });
      } else {
        setSubmitStatus('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('Error submitting booking. Please try again.');
    }
  };

  const services = [
    { name: 'Home Nursing Care', desc: 'Comprehensive nursing services at your doorstep with certified professionals.', icon: FaHospital, link: '/services/home-nursing', color: 'from-teal-500 to-teal-600' },
    { name: 'Injection Services', desc: 'Safe and hygienic injection administration by trained medical staff.', icon: FaSyringe, link: '/services/injection-services', color: 'from-blue-500 to-blue-600' },
    { name: 'Elderly & Patient Care', desc: 'Dedicated care for seniors and patients with personalized attention.', icon: FaUserFriends, link: '/services/elderly-care', color: 'from-purple-500 to-purple-600' },
    { name: 'Physiotherapy at Home', desc: 'Professional physiotherapy sessions tailored to your recovery needs.', icon: FaWalking, link: '/services/physiotherapy', color: 'from-orange-500 to-orange-600' },
    { name: 'Patient Sampling & Lab Tests', desc: 'Convenient lab tests and sampling services without leaving home.', icon: FaVial, link: '/services/patient-sampling', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Regular Health Checkups', desc: 'Routine health monitoring and comprehensive checkups at home.', icon: FaHeartbeat, link: '/services/health-checkups', color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div>
      {/* Hero Section - Modern with background image */}
      <section className="hero-modern">
        <div className="hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Healthcare professional" 
            onError={(e: any) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="hero-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge mb-6">
                <FaStar className="text-yellow-400" />
                Trusted by 100+ Families
              </span>
              <h1>Professional Healthcare at Your Doorstep</h1>
              <p>
                Experience world-class medical care in the comfort of your home. Our certified healthcare 
                professionals are available 24/7 for nursing, physiotherapy, and emergency care services.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="btn btn-white">
                  <FaPhone />
                  Book Appointment
                </Link>
                <Link to="/services" className="btn btn-outline-white">
                  Explore Services
                  <FaArrowRight />
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-white/70 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100+</div>
                  <div className="text-white/70 text-sm">Happy Patients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-white/70 text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Booking Card */}
            <motion.div
              className="block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="card-glass rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Booking</h3>
                {!quickCollapsed ? (
                  <>
                    <form className="space-y-4" onSubmit={async (e) => {
                      e.preventDefault();
                      setQuickStatus('');
                      try {
                        const payload = {
                          fullName: formData.fullName,
                          phoneNumber: formData.phoneNumber,
                          serviceRequired: formData.serviceRequired,
                          email: formData.email,
                        };
                        if (!API_BASE) {
                          setQuickStatus('Server not configured. Contact the site administrator.');
                          setQuickSuccess(false);
                        } else {
                          const res = await fetch(`${API_BASE}/api/request-service`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                          });
                          const json = await res.json().catch(() => ({}));
                          if (res.ok) {
                            // prefer server-reported emailSent when available
                            if (json.emailSent === true) {
                              setQuickStatus('Request received — we will call you shortly.');
                              setQuickSuccess(true);
                            } else if (json.emailSent === false) {
                              setQuickStatus('Request received but email notification failed.');
                              setQuickSuccess(false);
                            } else {
                              setQuickStatus('Request received.');
                              setQuickSuccess(true);
                            }
                            setFormData({ ...formData, fullName: '', phoneNumber: '', email: '' });
                          } else {
                            setQuickStatus((json && json.message) || 'Failed to send request. Please try again.');
                            setQuickSuccess(false);
                          }
                        }
                      } catch (err) {
                        setQuickStatus('Error sending request. Please try again.');
                        setQuickSuccess(false);
                      }
                      // Collapse form and show response briefly
                      setQuickCollapsed(true);
                      window.setTimeout(() => {
                        setQuickCollapsed(false);
                        setQuickStatus('');
                        setQuickSuccess(null);
                      }, 2800);
                    }}>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full"
                        required
                      />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full"
                        required
                      />
                      <select name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} className="w-full">
                        <option>Home Nursing Care</option>
                        <option>Injection Services</option>
                        <option>Physiotherapy</option>
                        <option>Elderly Care</option>
                      </select>
                      <button type="submit" className="btn btn-primary w-full">
                        Request Callback
                      </button>
                    </form>
                    {quickStatus && <p style={{ color: '#000' }} className="text-center text-sm mt-3">{quickStatus}</p>}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{ color: '#000' }}
                    className="text-center p-6"
                  >
                    {quickSuccess ? (
                      <div className="flex flex-col items-center gap-3">
                        <FaCheckCircle className="text-teal-500 text-4xl" />
                        <h4 className="text-lg font-semibold text-black">Thanks — request received</h4>
                        <p className="text-sm text-black">We will call you shortly to confirm the details.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <h4 className="text-lg font-semibold text-black">Submission status</h4>
                        <p className="text-sm text-black">{quickStatus || 'An error occurred. Please try again.'}</p>
                      </div>
                    )}
                  </motion.div>
                )}
                <p style={{ color: '#000' }} className="text-center text-black text-sm mt-4">
                  We'll call you back within 30 minutes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4">Our Services</span>
            <h2 className="text-gray-900 mb-4">Comprehensive Healthcare Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From nursing care to physiotherapy, we bring hospital-quality healthcare to your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="card group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`icon-box icon-box-primary mb-6 bg-gradient-to-br ${service.color}`}>
                    <ServiceIcon />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <Link 
                    to={service.link} 
                    className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 group/link"
                  >
                    Learn More 
                    <FaArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="badge mb-4">Why Choose Us</span>
              <h2 className="text-gray-900 mb-6">Trusted Healthcare Partner for Your Family</h2>
              <p className="text-gray-600 text-lg mb-8">
                We combine medical expertise with compassionate care, making healthcare accessible
                and comfortable for everyone in your family.
              </p>
              <div className="space-y-4">
                {[
                  { icon: FaUserMd, title: 'Certified Professionals', desc: 'All healthcare providers are licensed and experienced' },
                  { icon: FaShieldAlt, title: 'Safe & Hygienic', desc: 'Strict infection control and safety protocols' },
                  { icon: FaClock, title: '24/7 Availability', desc: 'Round-the-clock emergency support' },
                  { icon: FaMoneyBillWave, title: 'Transparent Pricing', desc: 'No hidden charges, clear upfront costs' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="icon-box-light w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare at home"
                  className="w-full h-[500px] object-cover"
                  onError={(e: any) => { e.target.style.display = 'none'; }}
                />
              </div>
              {/* Stats overlay card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center">
                    <FaTrophy className="text-white text-2xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">5+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="badge mb-4">How It Works</span>
            <h2 className="text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting quality healthcare at home has never been easier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200"></div>
            
            {[
              { step: '1', title: 'Book Service', desc: 'Call us or fill out our online form to schedule your appointment', icon: FaPhone, color: 'from-teal-500 to-teal-600' },
              { step: '2', title: 'Assessment', desc: 'Our healthcare team assesses your specific needs and requirements', icon: FaClipboardList, color: 'from-blue-500 to-blue-600' },
              { step: '3', title: 'Home Visit', desc: 'Receive professional care in the comfort of your home', icon: FaHomeIcon, color: 'from-purple-500 to-purple-600' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <div className="text-center">
                    <item.icon className="text-white text-3xl mb-1" />
                    <span className="text-white text-xl font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5+', label: 'Years Experience', icon: FaTrophy },
              { number: '100+', label: 'Patients Served', icon: FaUsers },
              { number: '20+', label: 'Medical Staff', icon: FaUserMd },
              { number: '99%', label: 'Satisfaction', icon: FaHeart },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="text-white/80 text-3xl mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-teal-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="badge mb-4">Get Started</span>
              <h2 className="text-gray-900 mb-6">Book Your Home Healthcare Service Today</h2>
              <p className="text-gray-600 text-lg mb-8">
                Fill out the form and our team will contact you within 30 minutes to confirm your appointment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-teal-500 text-xl" />
                  <span className="text-gray-700">Free consultation call</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-teal-500 text-xl" />
                  <span className="text-gray-700">Same-day appointments available</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-teal-500 text-xl" />
                  <span className="text-gray-700">24/7 emergency support</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="card p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Request DoctorOnDoor Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                    >
                      <option>Home Nursing Care</option>
                      <option>Injection Services</option>
                      <option>Elderly & Patient Care</option>
                      <option>Physiotherapy at Home</option>
                      <option>Patient Sampling & Lab Tests</option>
                      <option>Regular Health Checkups</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Condition</label>
                  <textarea
                    name="patientCondition"
                    value={formData.patientCondition}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe the patient's condition..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Your address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <input
                      type="datetime-local"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Submit Request
                </button>
                {submitStatus && (
                  <p className={`mt-4 text-center font-medium ${submitStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;