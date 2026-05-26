import { motion } from "framer-motion";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">

        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Modern Digital Solutions
          </motion.h1>

          <p>
            Exact rebuilt responsive experience
            matching the original Zoihouse design.
          </p>

          <div className="hero-actions">
            <button>Explore</button>
            <button className="secondary">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src="/public/hero-home.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}