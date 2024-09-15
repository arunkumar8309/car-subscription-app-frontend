import React, { useState, useEffect } from 'react';
import { createSubscription, getSubscriptionDetails, updateSubscription } from './../api/apiService';
import { useParams, useNavigate } from 'react-router-dom';

const SubscriptionForm = () => {
  const { subscriptionId } = useParams();
  const [carType, setCarType] = useState('');
  const [planType, setPlanType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [minDate, setMinDate] = useState('');
  const navigate = useNavigate();

  const formatDateToYYYYMMDD = (date) => {
    const newDate = new Date(date);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const today = new Date();
    setMinDate(formatDateToYYYYMMDD(today));
  }, []);

  useEffect(() => {
    if (subscriptionId) {
      const fetchSubscriptionDetails = async () => {
        try {
          const response = await getSubscriptionDetails(subscriptionId);
          const data = response.data;

          setCarType(data.carType);
          setPlanType(data.planType);
          setStartDate(formatDateToYYYYMMDD(data.startDate));
          setTimeSlot(data.timeSlot);
        } catch (error) {
          console.error(error);
        }
      };

      fetchSubscriptionDetails();
    } else {
      setCarType('');
      setPlanType('');
      setStartDate('');
      setTimeSlot('');
      setSuccessMessage('');
      setErrors({});
    }
  }, [subscriptionId]);

  const validateForm = () => {
    const newErrors = {};
    if (!carType) newErrors.carType = 'Car Type is required.';
    if (!planType) newErrors.planType = 'Plan Type is required.';
    if (!startDate) newErrors.startDate = 'Start Date is required.';
    if (!timeSlot) newErrors.timeSlot = 'Time Slot is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subscriptionData = { carType, planType, startDate, timeSlot };
    try {
      if (subscriptionId) {
        await updateSubscription(subscriptionId, subscriptionData);
        setSuccessMessage('Subscription updated successfully');
      } else {
        await createSubscription(subscriptionData);
        setSuccessMessage('Subscription created successfully');
      }

      setCarType('');
      setPlanType('');
      setStartDate('');
      setTimeSlot('');
      navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-[70%] lg:w-[45%] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          {subscriptionId ? 'Update Subscription' : 'Create Subscription'}
        </h2>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Type */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Type</label>
            <div className="flex flex-wrap gap-4">
              {['Hatchback', 'Sedan', 'CSUV', 'SUV'].map(type => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={type}
                    checked={carType === type}
                    onChange={(e) => setCarType(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                  />
                  <span className="ml-2 text-gray-800 dark:text-gray-300">{type}</span>
                </label>
              ))}
            </div>
            {errors.carType && <p className="text-red-500 text-sm mt-1">{errors.carType}</p>}
          </div>

          {/* Plan Type */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plan Type</label>
            <div className="flex flex-wrap gap-4">
              {['Daily', 'Alternate'].map(plan => (
                <label key={plan} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={plan}
                    checked={planType === plan}
                    onChange={(e) => setPlanType(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                  />
                  <span className="ml-2 text-gray-800 dark:text-gray-300">{plan}</span>
                </label>
              ))}
            </div>
            {errors.planType && <p className="text-red-500 text-sm mt-1">{errors.planType}</p>}
          </div>

          {/* Time Slot */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Slot</label>
            <div className="flex flex-wrap gap-4">
              {['6-8 AM', '8-10 AM', '10-12 AM'].map(slot => (
                <label key={slot} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={slot}
                    checked={timeSlot === slot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                  />
                  <span className="ml-2 text-gray-800 dark:text-gray-300">{slot}</span>
                </label>
              ))}
            </div>
            {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
          </div>

          {/* Start Date */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
              {subscriptionId ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
