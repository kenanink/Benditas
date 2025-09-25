import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkSection() {
  const links = [
    { name: 'Tatiana Peña', path: '/about' },
    { name: 'Procedimientos Esteticos', path: '/services' },
    { name: 'Procedimientos No Quirúrgicos', path: '/services' },
    { name: 'Pestanas', path: '/medical-tourism' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-6">Links</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="text-pink-100 hover:text-white transition-colors text-sm hover:underline"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}