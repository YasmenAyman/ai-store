import React from 'react';

export const Card = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex items-center">
        <div className={`p-3 rounded-lg bg-accent/10 text-accent mr-4`}>
            {Icon && <Icon size={24} />}
        </div>
        <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
    </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const variants = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring',
        secondary: 'bg-card text-foreground border border-border hover:bg-muted focus:ring-ring',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive',
    };

    return (
        <button
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const Badge = ({ children, variant = 'gray' }) => {
    const variants = {
        blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        green: 'bg-green-500/10 text-green-500 border-green-500/20',
        red: 'bg-red-500/10 text-red-500 border-red-500/20',
        yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        gray: 'bg-muted text-muted-foreground border-border',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]}`}>
            {children}
        </span>
    );
};
