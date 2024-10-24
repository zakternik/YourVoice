import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { publicRoutes } from '../routes'; 

interface RouteType {
  name: string;
  to: string;
  visible: boolean;
  element: React.ReactNode; // Adjust if you want to specify other properties
}

const Header: React.FC = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link 
          to="/" 
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <span className="fs-4">Your Voice</span>
        </Link>
  
        <ul className="nav nav-pills">
          {publicRoutes
            .filter(route => route.visible)
            .map((route: RouteType) => ( // Specify the type for route
              <li key={route.to} className="nav-item"> {/* Add a unique key for each item */}
                <NavLink 
                  to={route.to} 
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
        </ul> 
      </header>
    </div>
  );
};

export default Header;
