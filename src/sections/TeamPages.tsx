import { DrawnUnderline } from '../components/DrawnUnderline';

export function CathedralBlueprint({ variant = 'art' }: { variant?: 'art' | 'code' }) {
  return (
    <div className={`cathedral-blueprint cathedral-${variant}`} aria-label="Cathedral of Learning architectural study">
      <svg viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="cathedral-svg">
        {/* Ground & base */}
        <line x1="20" y1="380" x2="260" y2="380" stroke="currentColor" strokeWidth="2" />
        <rect x="50" y="320" width="180" height="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray={variant === 'code' ? '4 2' : undefined} />
        <rect x="70" y="270" width="140" height="50" stroke="currentColor" strokeWidth="1.5" />
        {/* Main central tower */}
        <rect x="90" y="160" width="100" height="110" stroke="currentColor" strokeWidth="1.5" />
        {/* Stepped upper tier */}
        <rect x="105" y="90" width="70" height="70" stroke="currentColor" strokeWidth="1.5" />
        {/* Crown & spire */}
        <rect x="120" y="45" width="40" height="45" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="140,15 130,45 150,45" stroke="currentColor" strokeWidth="1.5" fill="none" />
        {/* Gothic vertical buttresses / piers */}
        <line x1="110" y1="90" x2="110" y2="320" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="125" y1="45" x2="125" y2="320" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="155" y1="45" x2="155" y2="320" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="170" y1="90" x2="170" y2="320" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        {/* Arched windows and details */}
        <path d="M135 110 A5 5 0 0 1 145 110 V135 H135 Z" stroke="var(--action)" strokeWidth="1.2" fill="none" />
        <path d="M135 180 A5 5 0 0 1 145 180 V205 H135 Z" stroke="var(--action)" strokeWidth="1.2" fill="none" />
        <path d="M115 200 A4 4 0 0 1 123 200 V220 H115 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        <path d="M157 200 A4 4 0 0 1 165 200 V220 H157 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        {/* Setback pinnacles */}
        <line x1="88" y1="160" x2="88" y2="150" stroke="currentColor" strokeWidth="1.5" />
        <line x1="192" y1="160" x2="192" y2="150" stroke="currentColor" strokeWidth="1.5" />
        <line x1="103" y1="90" x2="103" y2="82" stroke="currentColor" strokeWidth="1.5" />
        <line x1="177" y1="90" x2="177" y2="82" stroke="currentColor" strokeWidth="1.5" />
        {/* Dimension ticks */}
        <line x1="30" y1="15" x2="30" y2="380" stroke="var(--action)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <line x1="25" y1="15" x2="35" y2="15" stroke="var(--action)" strokeWidth="1" opacity="0.7" />
        <line x1="25" y1="380" x2="35" y2="380" stroke="var(--action)" strokeWidth="1" opacity="0.7" />
        <text x="38" y="200" transform="rotate(-90 38 200)" fill="var(--action)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.1em" opacity="0.8">535 FT / 42 FLOORS</text>
      </svg>
    </div>
  );
}

export function ArtTeam() {
  return (
    <section className="wrap scene-section team-spec-scene cinematic-enter" id="art-team" aria-labelledby="art-team-title">
      <div className="team-spec-nav cinematic-fade-1">
        <span className="eyebrow"><span className="red-dash"/> IGDC @ PITT TEAMS</span>
        <div className="team-pills">
          <a href="./art-team.html" className="team-pill is-active" aria-current="page">Art Team</a>
          <a href="./code-team.html" className="team-pill">Code Team</a>
          <a href="./team.html" className="team-pill">All Team</a>
          <a href="./join.html" className="team-pill team-pill-join">Join Art Team ↗</a>
        </div>
      </div>

      <div className="team-spec-grid">
        {/* Top Left: Logo + Heading + Description */}
        <div className="spec-card spec-header-card cinematic-fade-2">
          <div className="spec-title-row">
            <div className="spec-bracket-badge spec-logo-badge" title="Team Logo placeholder">
              <span className="bracket-tag">[Logo]</span>
              <svg viewBox="0 0 32 32" className="mini-icon" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
                <path d="M10 20 L16 10 L22 20 Z" stroke="var(--action)" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div>
              <p className="eyebrow">CREATIVE DISCIPLINE</p>
              <h1 id="art-team-title">
                <DrawnUnderline>Art Team</DrawnUnderline>
              </h1>
            </div>
          </div>
          <div className="spec-bracket-box spec-description-box">
            <span className="bracket-tag">[Description]</span>
            <p>
              Dedicated to visual storytelling, 2D sprite work, 3D asset modeling, concept illustration, and animation for Pitt indie game projects.
            </p>
          </div>
        </div>

        {/* Top Right: Picture that I drew? / Cathedral of Learning */}
        <div className="spec-card spec-visual-card cinematic-fade-3">
          <div className="spec-visual-header">
            <span className="bracket-tag">[Visual Concept Study]</span>
            <div className="spec-options-legend">
              <span className="option-label">Option 1: [Picture that I drew?]</span>
              <span className="option-divider">/</span>
              <span className="option-label option-highlight">Option 2: [Cathedral of Learning]</span>
            </div>
          </div>
          <div className="spec-art-display">
            <CathedralBlueprint variant="art" />
            <div className="spec-art-caption">
              <span>CATHY STUDY · CONCEPT EXPLORATION</span>
              <span className="bracket-note">[Asset discussion pending team review]</span>
            </div>
          </div>
        </div>

        {/* Bottom Left: Purpose of Establish */}
        <div className="spec-card spec-tall-card spec-purpose-card cinematic-fade-4">
          <div className="spec-card-head">
            <h3>Purpose of Establish</h3>
            <span className="bracket-tag">[...]</span>
          </div>
          <div className="spec-card-body">
            <p className="spec-lead-text">
              To cultivate an open, supportive studio environment at Pitt where artists—regardless of prior game engine experience—can design interactive visuals and bring playable worlds to life.
            </p>
            <ul className="spec-bullet-list">
              <li>Demystify technical game art pipelines (sprites, textures, rigs, shaders).</li>
              <li>Bridge communication between creative artists and software programmers.</li>
              <li>Build personal portfolios with credited, published student indie titles.</li>
              <li>Collaborate closely with the Code Team on active semester projects.</li>
            </ul>
            <div className="spec-discussion-prompt">
              <span className="prompt-label">[Discussion note]</span>
              <span>Open for member input during Saturday GBM (now until 12/13, 2-3 PM Lawrence 104).</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Top: What do we do? */}
        <div className="spec-card spec-action-card spec-what-card cinematic-fade-4">
          <div className="spec-card-head">
            <h3>What do we do?</h3>
            <span className="bracket-tag">[...]</span>
          </div>
          <div className="spec-card-body">
            <p>
              We craft visual assets for active club titles—from initial moodboards and character turnarounds to finalized pixel art, 3D models, UI elements, and promotional key art.
            </p>
            <div className="spec-chips">
              <span>Concept Art</span>
              <span>2D Animation</span>
              <span>3D Low-Poly</span>
              <span>UI/UX Interface</span>
              <span>Environment Art</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Bottom: Skills developed */}
        <div className="spec-card spec-skills-card cinematic-fade-5">
          <div className="spec-card-head">
            <h3>Skills developed</h3>
            <span className="bracket-tag">[...]</span>
          </div>
          <div className="spec-card-body">
            <p>
              Members build industry-standard game art workflows and cross-discipline collaboration experience:
            </p>
            <div className="spec-skills-grid">
              <div>
                <strong>Asset Export & Pipelines</strong>
                <span>Figma, Blender, Aseprite, Unity Sprite Editor</span>
              </div>
              <div>
                <strong>Artistic Direction</strong>
                <span>Color scripting, lighting keys, silhouette clarity</span>
              </div>
              <div>
                <strong>Team Production</strong>
                <span>Version control for assets, scope control, sprint goals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CodeTeam() {
  return (
    <section className="wrap scene-section team-spec-scene cinematic-enter" id="code-team" aria-labelledby="code-team-title">
      <div className="team-spec-nav cinematic-fade-1">
        <span className="eyebrow"><span className="red-dash"/> IGDC @ PITT TEAMS</span>
        <div className="team-pills">
          <a href="./art-team.html" className="team-pill">Art Team</a>
          <a href="./code-team.html" className="team-pill is-active" aria-current="page">Code Team</a>
          <a href="./team.html" className="team-pill">All Team</a>
          <a href="./join.html" className="team-pill team-pill-join">Join Code Team ↗</a>
        </div>
      </div>

      <div className="team-spec-grid">
        {/* Top Left: Logo + Heading + Description */}
        <div className="spec-card spec-header-card cinematic-fade-2">
          <div className="spec-title-row">
            <div className="spec-bracket-badge spec-logo-badge" title="Team Logo placeholder">
              <span className="bracket-tag">[Logo]</span>
              <svg viewBox="0 0 32 32" className="mini-icon" aria-hidden="true">
                <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M10 16 L14 12 M10 16 L14 20 M18 20 L22 20" stroke="var(--action)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="eyebrow">TECHNICAL DISCIPLINE</p>
              <h1 id="code-team-title">
                <DrawnUnderline>Code Team</DrawnUnderline>
              </h1>
            </div>
          </div>
          <div className="spec-bracket-box spec-description-box">
            <span className="bracket-tag">[Description]</span>
            <p>
              Focusing on game architecture, physics programming, player controllers, AI systems, and engine pipelines in Unity and C# for student-made indie titles.
            </p>
          </div>
        </div>

        {/* Top Right: Code Window + Abstraction of Cathedral of Learning */}
        <div className="spec-card spec-visual-card spec-code-terminal-card cinematic-fade-3">
          <div className="code-window-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="dot dot-close" />
              <span className="dot dot-minimize" />
              <span className="dot dot-maximize" />
            </div>
            <span className="window-title">CathedralOfLearning.cs — Unity / Pitt</span>
            <span className="bracket-tag">[Preferably lines of code]</span>
          </div>

          <div className="spec-code-split">
            {/* Left side: lines of code */}
            <div className="spec-code-editor">
              <pre className="code-snippet">
                <code>
{`// Pitt Indie Game Dev Club
public class CathedralOfLearning : Landmark {
    [SerializeField] private float height = 535f;
    [SerializeField] private int floors = 42;
    private GothicSpire spire;

    void Start() {
        InitializeArchitecture();
        ConnectWithArtTeam();
    }

    void Update() {
        if (Player.InOaklandCampus) {
            RenderGothicSilhouette();
        }
    }
}`}
                </code>
              </pre>
            </div>

            {/* Right side: Abstraction of Cathedral of Learning */}
            <div className="spec-cathy-wireframe">
              <div className="wireframe-label">
                <span className="bracket-tag">[Abstraction of Cathedral of Learning]</span>
              </div>
              <CathedralBlueprint variant="code" />
            </div>
          </div>
        </div>

        {/* Bottom Left: Purpose of Establish */}
        <div className="spec-card spec-tall-card spec-purpose-card cinematic-fade-4">
          <div className="spec-card-head">
            <h3>Purpose of Establish</h3>
            <span className="bracket-tag">[...]</span>
          </div>
          <div className="spec-card-body">
            <p className="spec-lead-text">
              To provide Pitt students a collaborative software lab where developers of any level can learn game programming fundamentals, practice system design, and ship real games together.
            </p>
            <ul className="spec-bullet-list">
              <li>Lower the barrier to entry for game programming and C# scripting.</li>
              <li>Introduce scalable patterns: component systems, state machines, and event buses.</li>
              <li>Collaborate seamlessly with artists to import, animate, and tune game feel.</li>
              <li>Prepare members for game jams, internships, and technical software roles.</li>
            </ul>
            <div className="spec-discussion-prompt">
              <span className="prompt-label">[Discussion note]</span>
              <span>Open for member input during Saturday GBM (now until 12/13, 2-3 PM Lawrence 104).</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Top: What do we do? */}
        <div className="spec-card spec-action-card spec-what-card cinematic-fade-4">
          <div className="spec-card-head">
            <h3>What do we do?</h3>
            <span className="bracket-tag">[...]</span>
          </div>
          <div className="spec-card-body">
            <p>
              We implement core gameplay mechanics, player input controls, camera mathematics, particle hooks, audio triggers, UI logic, and compile playable builds for PC and WebGL.
            </p>
            <div className="spec-chips">
              <span>Player Controllers</span>
              <span>State Machines</span>
              <span>Game Physics</span>
              <span>AI Behaviors</span>
              <span>Git & GitHub</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Bottom: Skills developed */}
        <div className="spec-card spec-skills-card cinematic-fade-5">
          <div className="spec-card-head">
            <h3>Skills developed</h3>
            <span className="bracket-tag">[...]</span>
          </div>
          <div className="spec-card-body">
            <p>
              Developers gain practical engineering experience bridging software logic with interactive user experiences:
            </p>
            <div className="spec-skills-grid">
              <div>
                <strong>Game Architecture</strong>
                <span>C# Scripting, ScriptableObjects, decoupled event architectures</span>
              </div>
              <div>
                <strong>Engine Mastery</strong>
                <span>Unity Physics2D/3D, Input System, animation controllers</span>
              </div>
              <div>
                <strong>Software Practices</strong>
                <span>Branching workflows, merge conflicts resolution, automated builds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

