import React from 'react';
import { Clock, ShieldAlert, ShieldCheck, FileText, Trash2, X } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const HistoryTable = ({ history, onSelect, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
        <Clock size={40} style={{ margin: '0 auto 1rem' }} />
        <p>No scan history found.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <Clock size={24} color="#6366f1" /> Recent History
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <th style={{ padding: '0.5rem 1rem' }}>File</th>
              <th style={{ padding: '0.5rem 1rem' }}>Verdict</th>
              <th style={{ padding: '0.5rem 1rem' }}>Score</th>
              <th style={{ padding: '0.5rem 1rem' }}>Date</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {history.map((scan) => (
              <motion.tr 
                key={scan.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => onSelect(JSON.parse(scan.full_report))}
                className="hover:bg-white/5"
              >
                <td style={{ padding: '1rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <FileText size={16} color="#94a3b8" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{scan.filename}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                   <div style={{ 
                     display: 'inline-flex', 
                     alignItems: 'center', 
                     gap: '0.4rem', 
                     padding: '0.2rem 0.6rem', 
                     borderRadius: '8px',
                     fontSize: '10px',
                     fontWeight: '800',
                     background: scan.verdict === 'Malicious' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                     color: scan.verdict === 'Malicious' ? '#ef4444' : '#10b981'
                   }}>
                     {scan.verdict === 'Malicious' ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                     {scan.verdict.toUpperCase()}
                   </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: scan.threat_score > 70 ? '#ef4444' : '#fff' }}>
                    {Math.round(scan.threat_score)}%
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {new Date(scan.timestamp).toLocaleString()}
                  </span>
                </td>
                <td style={{ padding: '1rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', textAlign: 'right' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(scan.id);
                    }}
                    style={{ 
                      background: 'none', border: 'none', color: '#ef4444', 
                      cursor: 'pointer', padding: '0.5rem', opacity: 0.6,
                      transition: 'opacity 0.2s'
                    }}
                    className="hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
