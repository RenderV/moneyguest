'use client'
import styles from './card.module.css'
import { DM_Sans } from 'next/font/google'
import React, { HTMLAttributes } from 'react';

const dmsans = DM_Sans(
    {
        subsets: ["latin"],
        weight: "500",
    }
)

interface SimpleCardProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export function SimpleCard({ children, className = "", ...props }: SimpleCardProps) {
    return (
        <div className={`${styles.rectangle} ${className ? className : ""}`} {...props}>
            {children}
        </div>
    );
}

export function TitledCard({ title, children }: {
    title?: string
    children?: React.ReactNode,
}) {
    return (
        <SimpleCard>
            {title && <p className={styles.title + " " + dmsans.className}>{title}</p>}
            <div style={{ width: "100%", height: "100%" }}>
                {children}
            </div>
        </SimpleCard>
    )
}