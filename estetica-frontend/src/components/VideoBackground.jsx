import React from 'react';

export default function VideoBackground({ children, overlay = true }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image (since we don't have video) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1648671095057-e8227bd31488?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMG1ha2V1cCUyMHdvbWFufGVufDB8MHx8fDE3NTg3NjY5OTJ8MA&ixlib=rb-4.1.0&q=85')`
        }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-rose-800/70 to-pink-700/60" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}