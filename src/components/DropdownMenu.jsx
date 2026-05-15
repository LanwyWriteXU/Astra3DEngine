import React, { useState, useRef, useEffect } from 'react';

function DropdownMenu({ label, items, className = '', roundedCorners = 'all', position = 'bottom' }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  const getRoundedClass = () => {
    if (typeof roundedCorners === 'string') {
      return `dropdown-rounded-${roundedCorners}`;
    }
    
    const classes = [];
    if (roundedCorners.topLeft) classes.push('dropdown-rounded-tl');
    if (roundedCorners.topRight) classes.push('dropdown-rounded-tr');
    if (roundedCorners.bottomLeft) classes.push('dropdown-rounded-bl');
    if (roundedCorners.bottomRight) classes.push('dropdown-rounded-br');
    return classes.join(' ');
  };

  const positionClass = position === 'top' ? 'dropdown-position-top' : '';

  return (
    <div className={`dropdown-menu ${className}`} ref={menuRef}>
      <button
        className="menu-btn dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      {isOpen && (
        <div className={`dropdown-content ${getRoundedClass()} ${positionClass}`}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className="dropdown-divider" />
              ) : (
                <button
                  className={`dropdown-item ${item.disabled ? 'disabled' : ''}`}
                  onClick={() => !item.disabled && handleItemClick(item)}
                  disabled={item.disabled}
                >
                  {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                  <span className="dropdown-label">{item.label}</span>
                  {item.shortcut && <span className="dropdown-shortcut">{item.shortcut}</span>}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
