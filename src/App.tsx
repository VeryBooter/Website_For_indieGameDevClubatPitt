import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OpeningPlan } from './components/OpeningPlan';
import { ScrollReveals } from './components/ScrollReveals';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { People } from './sections/People';
import { Events } from './sections/Events';
import { Sponsorship } from './sections/Sponsorship';
import { Join } from './sections/Join';
export function App() {
    const [replay, setReplay] = useState(0);
    return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}><Hero /><About /><Projects /><People /><Events /><Sponsorship /><Join /></main><Footer onReplay={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'instant' }); setReplay(value => value + 1); }}/><OpeningPlan replay={replay}/><ScrollReveals /></>;
}
