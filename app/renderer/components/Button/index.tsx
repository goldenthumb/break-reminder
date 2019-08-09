import React from 'react';

const css = require('./Button.scss');

interface ButtonProps {
    theme: string;
    action: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export default function Button({ theme, action, children, disabled }: ButtonProps) {
    return (
        <button
            type='button'
            className={css[theme]}
            disabled={disabled}
            onClick={action}
        >
            {children}
        </button>
    );
}
