import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  Cpu, 
  ShieldCheck, 
  ArrowDown,
  ChevronRight,
  ArrowRight,
  Shield,
  Lock,
  Zap,
  Globe,
  Database,
  Fingerprint
} from 'lucide-react';

const SECTIONS = [
  {
    title: "The Ransomware Crisis",
    description: "Ransomware is the most critical threat in the modern digital era. It hijacks entire infrastructures and holds them for ransom with unprecedented efficiency.",
    icon: <ShieldAlert size={60} />,
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem' }}>
        {[
          { label: "New Attack Every", value: "11 Sec" },
          { label: "Avg. Ransom Cost", value: "$4.5M" },
          { label: "Global Damage", value: "$20B+" }
        ].map((s, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="glow-border" 
            style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}
          >
            <p style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{s.label}</p>
            <p className="text-metallic" style={{ fontSize: '2.2rem', fontWeight: '900' }}>{s.value}</p>
          </motion.div>
        ))}
      </div>
    ),
    theme: 'dark'
  },
  {
    title: "Anatomy of an Attack",
    description: "Advanced threats operate in silent stages. High-fidelity detection at every layer is the only way to safeguard your perimeter against zero-day exploits.",
    icon: <Activity size={60} />,
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '3rem' }}>
        {[
          "Initial Access",
          "Persistent Control",
          "Lateral Spread",
          "Mass Encryption"
        ].map((s, i) => (
          <motion.div 
            key={i} 
            whileHover={{ x: 10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#f1f5f9', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}
          >
             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem' }}>{i+1}</div>
             <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1e293b' }}>{s}</span>
          </motion.div>
        ))}
      </div>
    ),
    theme: 'light'
  }
];

const CyberNode = ({ icon, color, radius, speed, scrollProgress }) => {
  const rotation = useTransform(scrollProgress, [0, 1], [0, 360 * speed]);
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: `rgba(15, 23, 42, 0.8)`,
        border: `1px solid ${color}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: `calc(50% - 25px)`,
        top: `calc(50% - 25px)`,
        x: useTransform(rotation, r => radius * Math.cos(r * (Math.PI / 180))),
        y: useTransform(rotation, r => radius * Math.sin(r * (Math.PI / 180))),
        zIndex: 2,
        boxShadow: `0 0 30px ${color}11`,
        backdropFilter: 'blur(10px)'
      }}
    >
      {React.cloneElement(icon, { size: 20, color: color })}
    </motion.div>
  );
};

const ScrollSection = ({ section, index }) => {
  const isLight = section.theme === 'light';
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ 
        minHeight: '100vh', 
        width: '100%',
        background: isLight ? '#09121c' : 'var(--bg)',
        color: 'var(--text-main)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 15%',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
            {section.icon}
          </div>
          <h2 className={isLight ? "" : "text-metallic"} style={{ fontSize: '4.5rem', fontWeight: '1000', marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            {section.title}
          </h2>
          <p style={{ fontSize: '1.4rem', opacity: 0.6, maxWidth: '800px', lineHeight: 1.4, fontWeight: '500' }}>
            {section.description}
          </p>
        </motion.div>
        {section.content}
      </div>
    </motion.section>
  );
};

const IntroView = ({ onComplete }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div style={{ background: 'var(--bg)', position: 'relative', overflowX: 'hidden' }}>
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(to right, var(--text-dim), var(--accent))',
          transformOrigin: '0%', scaleX, zIndex: 1000
        }}
      />

      {/* Kinetic Background Layer */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.3 }}>
         {[250, 450, 650].map((r, i) => (
             <div 
                 key={i}
                 style={{ 
                     position: 'absolute', 
                     left: '50%', top: '50%', 
                     width: r * 2, height: r * 2, 
                     borderRadius: '50%', 
                     border: '1px solid rgba(255,255,255,0.03)',
                     transform: 'translate(-50%, -50%)'
                 }} 
             />
         ))}
         
         <CyberNode icon={<Shield />} color="var(--text-dim)" radius={250} speed={1} scrollProgress={scrollYProgress} />
         <CyberNode icon={<Lock />} color="var(--accent)" radius={450} speed={-0.6} scrollProgress={scrollYProgress} />
         <CyberNode icon={<Zap />} color="var(--text-dim)" radius={650} speed={0.3} scrollProgress={scrollYProgress} />
      </div>

      <div className="bg-gradient" style={{ opacity: 0.4 }} />

      {/* Hero Section - Refined Metallic */}
      <section style={{ 
          height: '100vh', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          padding: '0 10%', position: 'relative', zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
        >
          <motion.div 
            style={{ 
                margin: '0 auto 2.5rem', width: '80px', height: '80px',
                background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8'
            }}
          >
            <Shield size={40} />
          </motion.div>

          <h1 className="text-metallic" style={{ 
              fontSize: '8rem', fontWeight: '1000', letterSpacing: '-0.06em', 
              lineHeight: 0.8, marginBottom: '1.5rem'
          }}>
            AMOT
          </h1>
          <h2 className="text-metallic-blue" style={{ 
              fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.4rem', 
              textTransform: 'uppercase', opacity: 0.9, marginBottom: '3rem',
              width: '100%', textAlign: 'center'
          }}>
            Ransomware & Forensics Analyser
          </h2>

          <p style={{ 
              fontSize: '1.4rem', color: '#64748b', maxWidth: '800px', 
              fontWeight: '500', marginBottom: '5rem', lineHeight: 1.5, opacity: 0.8,
              margin: '0 auto 5rem'
          }}>
            Advanced persistent threat detection and forensic <br /> 
            reconstruction for zero-day payloads.
          </p>

          <motion.div 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            style={{ cursor: 'pointer', color: '#6366f1', opacity: 0.8 }}
          >
            <p style={{ fontWeight: '900', letterSpacing: '0.4rem', fontSize: '0.75rem', marginBottom: '1rem', color: '#94a3b8' }}>INITIATE BRIEFING</p>
            <ArrowDown size={32} style={{ margin: '0 auto' }} />
          </motion.div>
        </motion.div>
      </section>

      {SECTIONS.map((section, i) => (
        <ScrollSection key={i} section={section} index={i} />
      ))}

      {/* Final Call to Action - More Textual and Elegant */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={{ 
          height: '100vh', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          background: '#020617', padding: '0 10%', position: 'relative', zIndex: 10
        }}
      >
        <div style={{ maxWidth: '900px' }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            style={{ marginBottom: '3rem' }}
          >
            <ShieldCheck size={100} color="#10b981" style={{ margin: '0 auto', filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.3))' }} />
          </motion.div>
          
          <h2 className="text-metallic" style={{ fontSize: '4rem', fontWeight: '1000', marginBottom: '2rem', letterSpacing: '0.1em' }}>
            AMOT AUTHORIZED
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            <p style={{ fontSize: '1.4rem', color: '#94a3b8', lineHeight: '1.6', fontWeight: '500' }}>
              The AMOT Triage Node is now synchronized with your environment. <br />
              All forensic modules are standing by for payload detonation.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '2rem 0' }}>
               {[
                 { label: "STATIC FORENSICS", value: "READY" },
                 { label: "ML CLASSIFIER", value: "ACTIVE" },
                 { label: "OSINT SYNC", value: "ONLINE" }
               ].map((s, i) => (
                 <div key={i}>
                    <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', marginBottom: '0.5rem' }}>{s.label}</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '900', color: '#10b981', letterSpacing: '0.1em' }}>{s.value}</p>
                 </div>
               ))}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, background: '#6366f1', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            style={{ 
              padding: '1.5rem 4rem', fontSize: '1.2rem', borderRadius: '14px', 
              background: 'transparent', border: '1px solid #6366f1', color: '#6366f1',
              fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s',
              display: 'inline-flex', alignItems: 'center', gap: '1rem'
            }}
          >
            LAUNCH AMOT LAB <ArrowRight size={24} />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default IntroView;
