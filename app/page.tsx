import Sphere from "./components/Sphere";

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a href="#" className="logo">
          HF<span>0</span>
        </a>
        <div className="nav-right">
          <a href="#">THESIS</a>
          <a href="#">TEAM</a>
          <a
            href="https://www.hf0.com"
            target="_blank"
            rel="noreferrer"
            className="apply-link"
          >
            APPLY ↗
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-label">
          <span>HACKER FELLOWSHIP ZERO</span>
          <span>EST. SAN FRANCISCO</span>
        </div>

        <div className="sphere-area">
          <div className="sphere">
            <Sphere />
          </div>
          <div className="sphere-shadow" />
        </div>

        <div className="hero-content">
          <h1>
            The residency
            <br />
            for repeat founders.
          </h1>

          <div className="hero-bottom">
            <p>
              A 12-week residency for exceptional
              <br />
              technical founders building ambitious companies.
            </p>

            <a
              href="https://www.hf0.com"
              target="_blank"
              rel="noreferrer"
              className="round-button"
            >
              APPLY NOW <span>↗</span>
            </a>
          </div>
        </div>

        <div className="vertical-text">BUILD SOMETHING GREAT</div>
      </section>
    </main>
  );
}
