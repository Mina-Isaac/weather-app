import React from 'react';
import './switch.css';

const Switch: React.FC = () => {
  return (
    <fieldset className='switcher'>
      <input className="switcher__input" name="celsius-fehrenhite-converter" id="switch" type="checkbox" />
      <label htmlFor="switch" className="switcher__label"></label>
      <span className="switcher__bg" aria-hidden="true"></span>
      <span className="switcher__labels" data-on=" °С " data-off=" °F " aria-hidden="true"></span>
    </fieldset>
  );
}

export default Switch;
