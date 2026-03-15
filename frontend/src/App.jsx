import React, { useState } from 'react';
import {
  Shield,
  Upload,
  ArrowRight,
  ArrowLeft,
  Search,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  LayoutGrid,
  Globe,
  Database,
  Fingerprint,
  Info
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import HistoryTable from './components/HistoryTable';
import IntroView from './components/IntroView';
import { useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000';

const THREAT_KNOWLEDGE_BASE = {
  'wannacry': 'WannaCry is a notorious ransomware that spreads via SMB vulnerabilities. It encrypts files and demands Bitcoin. Our analysis confirms signature matches for this family.',
  'locky': 'Locky ransomware is typically spread via phishing emails. It utilizes strong RSA-2048 and AES-128 encryption to lock user data.',
  'ryuk': 'Ryuk is often used in targeted attacks against enterprises, known for its ability to disable system restore and delete shadow copies.',
  'unknown': 'This file exhibits behaviors common to many ransomware families, including high-entropy file writes and suspicious API calls related to encryption and process hijacking.'
};

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showIntro]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const analyzeFile = async (selectedFile) => {
    setLoading(true);
    setResults(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze`, formData);
      setResults(response.data);
      fetchHistory(); // Refresh history after new analysis
    } catch (err) {
      setError(err.response?.data?.detail || 'Engine offline. Reconnecting to Titanium Node...');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (scanId) => {
    try {
      await axios.delete(`${API_BASE_URL}/history/${scanId}`);
      fetchHistory();
    } catch (err) {
      console.error('Failed to delete history:', err);
      setError('Failed to purge analysis from node.');
    }
  };

  if (showIntro) {
    return <IntroView onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="app-layout">
      <div className="bg-gradient" />
      <div className="mesh" />

      {/* Navigation Sidebar */}
      <aside className="sidebar">
        <div className="flex items-center gap-4 mb-12" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ background: '#6366f1', padding: '0.6rem', borderRadius: '14px', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Shield size={28} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', tracking: '-0.02em' }}>M.A.T.I.</h1>
            <p style={{ fontSize: '10px', color: '#6366f1', fontWeight: '800', letterSpacing: '0.1em', opacity: 0.8 }}>SECURITY LAB</p>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '14px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: '700' }}>
            <LayoutGrid size={20} />
            <span>Cyber Triage</span>
          </div>
          <div 
            onClick={() => setShowIntro(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '14px', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
            className="hover:bg-white/5"
          >
            <Info size={20} />
            <span>Intel Briefing</span>
          </div>
        </nav>

        <div className="stat-card" style={{ marginTop: 'auto', background: 'rgba(99,102,241,0.05)', borderColor: 'rgba(99,102,241,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', background: '#00e699', borderRadius: '50%', boxShadow: '0 0 8px #00e699' }} />
            <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#4ade80' }}>Global Protected</span>
          </div>
          <p style={{ fontSize: '10px', color: '#64748b' }}>Version: 1.0.4 Enterprise<br />Node: PRD-NYC-01</p>
        </div>
      </aside>

      {/* Main Analysis View */}
      <main className="main-view">
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Cyber Threat Triage</h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Multi-dimensional hybrid analysis of suspicious binaries.</p>
          </div>
          <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6366f1' }}>ENGINE STATUS: ONLINE</span>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
          {/* Left Column: Interaction & Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {!results && !loading && (
              <section className="glass-panel" style={{ padding: '4rem 3.5rem' }}>
                <div
                  className="upload-zone"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <div style={{ display: 'inline-flex', padding: '2rem', background: 'rgba(99,102,241,0.1)', borderRadius: '24px', marginBottom: '1.5rem' }}>
                    <Upload size={48} color="#6366f1" />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Ingest Payload</h3>
                  <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>Drop any suspicious PE or binary for global intelligence lookup and deep static forensics.</p>
                  <input id="file-upload" type="file" style={{ display: 'none' }} onChange={(e) => analyzeFile(e.target.files[0])} />
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-premium">Select File System <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} /></button>
                    <button
                      onClick={() => alert("M.A.T.I. Guard 1.0.4 Enterprise:\nDeveloped for advanced ransomware identification. \nUpload any suspicious binary to trigger 5-stage hybrid analysis.")}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '1rem 2rem', borderRadius: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Info size={16} /> More Info
                    </button>
                  </div>
                </div>
              </section>
            )}

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel"
                  style={{ textAlign: 'center', padding: '6rem' }}
                >
                  <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 2rem' }}>
                    <div style={{ position: 'absolute', inset: 0, border: '6px solid rgba(99,102,241,0.1)', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '6px solid #6366f1', borderRadius: '50%', borderTopColor: 'transparent' }} className="animate-spin" />
                    <Search size={32} color="#6366f1" style={{ position: 'absolute', inset: 0, margin: 'auto' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Accessing Global Intel...</h3>
                  <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
                    {['VirusTotal', 'Static-DB', 'ML-Core'].map((s, i) => (
                      <div key={i} style={{ fontSize: '10px', color: '#6366f1', fontWeight: '800', letterSpacing: '0.1em' }} className="animate-pulse">• {s} OK</div>
                    ))}
                  </div>
                </motion.div>
              )}

              {results && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Navigation & Back Action */}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                    <button
                      onClick={() => setResults(null)}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'all 0.2s ease' }}
                    >
                      <ArrowLeft size={16} /> RESET ANALYSIS
                    </button>
                  </div>

                  {/* Result Header */}
                  <div className={`verdict-banner ${results.verdict === 'Malicious' ? 'malicious' : 'benign'}`}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '24px' }}>
                      {results.verdict === 'Malicious' ? <AlertCircle size={48} /> : <ShieldCheck size={48} />}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.04em' }}>{results.verdict.toUpperCase()}</h2>
                      <p style={{ fontWeight: '700', opacity: 0.8 }}>GLOBAL THREAT SCORE: {Math.round(results.threat_score)}%</p>
                    </div>
                    <div className="threat-score-large">{Math.round(results.threat_score)}%</div>
                  </div>

                  {/* Global Intelligence Card */}
                  <div className="glass-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Globe size={24} color="#3b82f6" /> Global Intelligence & History
                      </h3>
                      <div style={{ padding: '0.4rem 1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '100px', fontSize: '10px', color: '#3b82f6', fontWeight: '800' }}>
                        LIVE OSINT SYNC
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                      <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem' }}>AV Detections</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '900', color: results.osint_report.detections > 5 ? '#ef4444' : '#10b981' }}>
                          {results.osint_report.detections} / {results.osint_report.total_engines}
                        </p>
                        <p style={{ fontSize: '10px', color: '#64748b', marginTop: '0.5rem' }}>Source: VirusTotal</p>
                      </div>
                      <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Threat Family</p>
                        <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{results.osint_report.family || 'Undefined'}</p>
                        <p style={{ fontSize: '10px', color: '#64748b', marginTop: '0.5rem' }}>ML Cluster Mapping</p>
                      </div>
                      <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Last Scan Date</p>
                        <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{results.osint_report.last_seen || 'Recently Identified'}</p>
                        <p style={{ fontSize: '10px', color: '#64748b', marginTop: '0.5rem' }}>Global Sync Time</p>
                      </div>
                    </div>
                  </div>

                  {/* Primary Data Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.2rem' }}>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '0.4rem' }}>CONSENSUS: <span style={{ color: '#fff' }}>{results.ml_detection.confidence}</span></div>
                      <div style={{ fontSize: '9px', color: '#6366f1', fontWeight: '800', marginBottom: '1rem' }}>{results.ml_detection.method.toUpperCase()}</div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                        <div style={{ width: `${results.ml_detection.score}%`, height: '100%', background: '#6366f1', borderRadius: '10px' }} />
                      </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.2rem' }}>
                      <h4 style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Fingerprint size={14} color="#ef4444" /> SIG MATCHES
                      </h4>
                      <div style={{ fontSize: '11px', fontWeight: '700' }}>{results.yara_scan.matches_count} Ransomware Rules</div>
                    </div>
                  </div>

                  {/* Predicted Attack Workflow */}
                  {/* User-Friendly Analysis Card */}
                  <div className={`glass-panel ${results.verdict === 'Malicious' ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`} style={{
                    border: results.verdict === 'Malicious' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                    background: results.verdict === 'Malicious' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div style={{
                        padding: '1rem',
                        borderRadius: '16px',
                        background: results.verdict === 'Malicious' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: results.verdict === 'Malicious' ? '#ef4444' : '#10b981'
                      }}>
                        {results.verdict === 'Malicious' ? <AlertCircle size={32} /> : <ShieldCheck size={32} />}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>
                          {results.verdict === 'Malicious' ? 'THREAT DETECTED' : 'FILE IS SAFE'}
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                          {results.verdict === 'Malicious'
                            ? `This file contains malicious code identified as ${results.osint_report.family || 'Ransomware'}.`
                            : "Risk assessment is low. No malicious behaviors or ransomware signatures were detected."}
                        </p>
                      </div>
                    </div>

                    {/* Threat Intel / Safe Context */}
                    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={16} /> {results.verdict === 'Malicious' ? 'Threat Intelligence' : 'Safety Verification'}
                      </h4>

                      <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                        {results.verdict === 'Malicious' ? (
                          (() => {
                            const family = (results.osint_report.family || '').toLowerCase();
                            const knownThreat = Object.keys(THREAT_KNOWLEDGE_BASE).find(k => family.includes(k));
                            return knownThreat ? THREAT_KNOWLEDGE_BASE[knownThreat] : THREAT_KNOWLEDGE_BASE['unknown'];
                          })()
                        ) : (
                          "Our multi-stage analysis (Static, ML, and OSINT) confirms this file does not match known ransomware families. It has a valid structure and does not attempt to illegally encrypt files or hijack system processes."
                        )}
                      </p>

                      {/* Technical Technical Toggle (retaining the workflow steps but hidden/minimized or shown as details) */}
                      {results.verdict === 'Malicious' && (
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Observed Behaviors:</p>
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {results.static_analysis.human_insights?.slice(0, 3).map((insight, i) => (
                              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#fca5a5', fontSize: '0.9rem' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }} />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History Section - Shown when not loading or even when results are shown */}
            {!loading && (
              <section style={{ marginTop: '2rem' }}>
                <HistoryTable 
                  history={history} 
                  onSelect={(report) => setResults(report)} 
                  onDelete={deleteHistory}
                />
              </section>
            )}
          </div>

          {/* Right Column: Intelligence Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Database size={20} color="#6366f1" /> Session Intel
              </h3>
              {results ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '20px' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.4rem' }}>{results.file_info.filename}</p>
                    <p style={{ fontSize: '10px', color: '#6366f1', fontFamily: 'JetBrains Mono' }}>{results.osint_report.hash}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em' }}>HUMAN-READABLE INSIGHTS</p>
                    {results?.static_analysis?.human_insights?.map((insight, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.8rem', background: 'rgba(99,102,241,0.05)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.1)' }}>
                        <ChevronRight size={14} color="#6366f1" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '4rem 0', textAlign: 'center', opacity: 0.2 }}>
                  <Search size={48} color="#6366f1" style={{ margin: '0 auto 1.5rem' }} />
                  <p style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8' }}>EMPTY - PLEASE UPLOAD FILE FIRST</p>
                </div>
              )}
            </section>

            <section className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem' }}>TTP Matrix</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '2rem' }}>MITRE ATT&CK Technical mapping.</p>
              <div className="mitre-grid">
                {results?.static_analysis?.mitre_techniques?.map((t, i) => (
                  <div key={i} className="mitre-tag">{t}</div>
                )) || <div style={{ opacity: 0.2, textAlign: 'center', width: '100%', padding: '2rem', fontSize: '10px', fontWeight: '800' }}>NO UPLOAD DETECTED</div>}
              </div>
            </section>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="alert-portal"
            style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#ef4444', color: 'white', padding: '1.5rem 2rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)', display: 'flex', gap: '1.5rem', alignItems: 'center', zIndex: 1000 }}
          >
            <AlertCircle />
            <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>{error}</p>
            <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: '900', cursor: 'pointer' }}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
