import { DrawnUnderline } from './DrawnUnderline';
import type { ReactNode } from 'react';
import { club, type Destination } from '../data/club';
export function Arrow({ diagonal = false }: {
    diagonal?: boolean;
}) {
    return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}
export function DraftNote() { return club.copyStatus === 'draft' ? <span className="draft-note">Draft club copy</span> : null; }
export function SectionHeading({ number, label, children }: {
    number: string;
    label: string;
    children: ReactNode;
}) {
    return <div className="section-heading"><p className="eyebrow"><span>{number}</span> {label}</p><h2><DrawnUnderline>{children}</DrawnUnderline></h2></div>;
}
export function DestinationLink({ destination }: {
    destination: Destination;
}) {
    return destination.url ? <a href={destination.url}>{destination.label}<Arrow /></a> : <div className="pending-link"><span>{destination.label}</span><span>{destination.pending}</span></div>;
}
