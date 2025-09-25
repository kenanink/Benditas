import React from 'react';
import VideoBackground from '../components/VideoBackground';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <VideoBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </VideoBackground>
  );
}