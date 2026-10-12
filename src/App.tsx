import { useState, useEffect } from 'react';
import './App.css';
import { ECHOCLIP_CORE_DATA } from './data/echoclipData';
import type { ActionItem, TranscriptSegment } from './data/echoclipData';

export function App() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'workflow' | 'features' | 'architecture' | 'privacy'>('workspace');
  const [workspaceSubTab, setWorkspaceSubTab] = useState<'intelligence' | 'transcript' | 'qa'>('intelligence');
  
  // Interactive conversation data state
  const [actionItems, setActionItems] = useState<ActionItem[]>(ECHOCLIP_CORE_DATA.sampleConversation.actionItems);
  const [activeSegmentId, setActiveSegmentId] = useState<string>('t3');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSecond, setCurrentSecond] = useState<number>(75);
  
  // Interactive recording simulation
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  
  // Q&A interactive state
  const [selectedQaIndex, setSelectedQaIndex] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<{ answer: string; citation: string } | null>(null);

  // Privacy toggles
  const [privacyToggles, setPrivacyToggles] = useState({
    consentLogged: true,
    externalAiDisclosure: true,
    localFirstBuffer: true,
    piiScrubbing: true
  });

  // Audio playback simulator
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSecond((prev) => {
          const next = prev + 1;
          // Find matching transcript segment
          const match = ECHOCLIP_CORE_DATA.sampleConversation.transcript.find(
            (s, idx, arr) => {
              const nextSeg = arr[idx + 1];
              return next >= s.timeSeconds && (!nextSeg || next < nextSeg.timeSeconds);
            }
          );
          if (match) {
            setActiveSegmentId(match.id);
          }
          if (next >= ECHOCLIP_CORE_DATA.sampleConversation.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Recording counter simulator
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleTask = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleSeekSegment = (segment: TranscriptSegment) => {
    setCurrentSecond(segment.timeSeconds);
    setActiveSegmentId(segment.id);
    setIsPlaying(true);
  };

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    
    const query = customQuestion.toLowerCase();
    if (query.includes('action') || query.includes('task') || query.includes('who')) {
      setCustomAnswer({
        answer: 'Extracted 4 actionable tasks: Alex Chen owns Riverpod state machine & background retries; Maya Lin owns JSON LLM schemas; David Park owns privacy consent UI.',
        citation: 'Action Items Schema • Sync Decisions'
      });
    } else if (query.includes('privacy') || query.includes('consent') || query.includes('security')) {
      setCustomAnswer({
        answer: 'Strict consent logging is verified prior to external cloud processing. Audio chunks are buffered locally with complete one-click deletion available.',
        citation: 'David Park & Maya Lin @ 02:30'
      });
    } else {
      setCustomAnswer({
        answer: `EchoClip analyzed the transcript: The team confirmed ElevenLabs Scribe as the primary transcription engine with Whisper fallback, and established structured relational entities for all decisions and action items.`,
        citation: 'Executive Summary • Sprint Sync'
      });
    }
  };

  // Filtered transcript
  const filteredTranscript = ECHOCLIP_CORE_DATA.sampleConversation.transcript.filter(
    (t) =>
      t.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.speakerName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="top-navbar glass-panel">
        <div className="brand-section">
          <div className="logo-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </div>
          <div>
            <div className="brand-title">
              {ECHOCLIP_CORE_DATA.identity.name}
              <span className="brand-badge">Intelligence Core</span>
            </div>
          </div>
        </div>

        <div className="header-meta">
          <div className="status-pill">
            <span className="pulse-dot"></span>
            <span>Speech & Memory Engine Ready</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner glass-panel">
        <h1 className="hero-tagline gradient-text">
          {ECHOCLIP_CORE_DATA.identity.tagline}
        </h1>
        <p className="hero-subtitle">
          {ECHOCLIP_CORE_DATA.identity.mission}
        </p>
        <div className="journey-pills">
          <span className="journey-node">01 Conversation</span>
          <span className="journey-arrow">→</span>
          <span className="journey-node">02 Structured Knowledge</span>
          <span className="journey-arrow">→</span>
          <span className="journey-node">03 Searchable Memory</span>
          <span className="journey-arrow">→</span>
          <span className="journey-node">04 Actionable Outcomes</span>
        </div>
      </section>

      {/* Main Tab Navigation */}
      <nav className="view-tabs" aria-label="Sections Navigation">
        <button
          className={`tab-btn ${activeTab === 'workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('workspace')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          Live Assistant Workspace
        </button>

        <button
          className={`tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          5-Stage Product Journey
        </button>

        <button
          className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          Core Capabilities
        </button>

        <button
          className={`tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Architecture & Data Models
        </button>

        <button
          className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Privacy & Trust Controls
        </button>
      </nav>

      {/* SECTION 1: WORKSPACE (Interactive Assistant) */}
      {activeTab === 'workspace' && (
        <section>
          {/* Audio Action Bar */}
          <div className="audio-action-bar glass-panel">
            <div className="recording-controls">
              <button
                className={`record-btn ${isRecording ? 'recording-active' : ''}`}
                onClick={() => setIsRecording(!isRecording)}
                title={isRecording ? 'Stop Recording' : 'One-Tap Record'}
              >
                {isRecording ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                )}
              </button>
              
              <div className="session-info">
                <h3>
                  {isRecording ? 'Live Microphone Stream Active...' : ECHOCLIP_CORE_DATA.sampleConversation.title}
                </h3>
                <div className="session-meta">
                  <span className="lifecycle-badge badge-ready">
                    {isRecording ? `RECORDING (${formatSeconds(recordingSeconds)})` : 'READY • SYNCHRONIZED'}
                  </span>
                  <span>{ECHOCLIP_CORE_DATA.sampleConversation.recordedAt}</span>
                  <span>•</span>
                  <span>Duration: {ECHOCLIP_CORE_DATA.sampleConversation.duration}</span>
                </div>
              </div>
            </div>

            {/* Simulated Audio Waveform Scrubber */}
            <div className="waveform-player">
              <button
                className="play-pause-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause Audio' : 'Play Audio'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              <div
                className="wave-bars-container"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setCurrentSecond(Math.floor(ratio * 150));
                }}
              >
                {Array.from({ length: 42 }).map((_, i) => {
                  const barHeight = 12 + Math.sin(i * 0.7) * 10 + (i % 3) * 6;
                  const barTime = (i / 42) * 150;
                  const isPlayed = barTime <= currentSecond;
                  return (
                    <div
                      key={i}
                      className={`wave-bar ${isPlayed ? 'played' : ''}`}
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>

              <span className="mono" style={{ fontSize: '0.82rem', color: '#94a3b8', minWidth: '42px' }}>
                {formatSeconds(currentSecond)}
              </span>
            </div>
          </div>

          {/* Sub Navigation within Workspace */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              className={`tab-btn ${workspaceSubTab === 'intelligence' ? 'active' : ''}`}
              onClick={() => setWorkspaceSubTab('intelligence')}
              style={{ flex: 'none', padding: '8px 18px' }}
            >
              Actionable Intelligence & Tasks
            </button>
            <button
              className={`tab-btn ${workspaceSubTab === 'transcript' ? 'active' : ''}`}
              onClick={() => setWorkspaceSubTab('transcript')}
              style={{ flex: 'none', padding: '8px 18px' }}
            >
              Synchronized Transcript ({ECHOCLIP_CORE_DATA.sampleConversation.transcript.length} Segments)
            </button>
            <button
              className={`tab-btn ${workspaceSubTab === 'qa' ? 'active' : ''}`}
              onClick={() => setWorkspaceSubTab('qa')}
              style={{ flex: 'none', padding: '8px 18px' }}
            >
              AI Memory Q&A
            </button>
          </div>

          {/* Workspace Content Views */}
          {workspaceSubTab === 'intelligence' && (
            <div className="workspace-grid">
              {/* Left Column: Summary & Decisions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="glass-panel card-inner">
                  <div className="card-header">
                    <div className="card-title">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Executive Summary
                    </div>
                    <span className="brand-badge">Gemini Orchestration</span>
                  </div>

                  <p style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                    {ECHOCLIP_CORE_DATA.sampleConversation.summary.overview}
                  </p>

                  <div className="topic-chips">
                    {ECHOCLIP_CORE_DATA.sampleConversation.summary.topics.map((topic, i) => (
                      <span key={i} className="topic-chip">
                        #{topic}
                      </span>
                    ))}
                  </div>

                  <h4 style={{ fontSize: '0.95rem', marginTop: '16px', color: '#fff' }}>Key Takeaways</h4>
                  <ul className="key-points-list">
                    {ECHOCLIP_CORE_DATA.sampleConversation.summary.keyPoints.map((point, i) => (
                      <li key={i} className="key-point-item">
                        <span className="point-bullet">✦</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extracted Decisions */}
                <div className="glass-panel card-inner">
                  <div className="card-header">
                    <div className="card-title">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Extracted Decisions ({ECHOCLIP_CORE_DATA.sampleConversation.decisions.length})
                    </div>
                  </div>

                  {ECHOCLIP_CORE_DATA.sampleConversation.decisions.map((d) => (
                    <div key={d.id} className="decision-card">
                      <div className="decision-title">{d.decision}</div>
                      <div className="decision-context">{d.context}</div>
                      <div className="decision-meta">
                        <span>Consensus: <strong style={{ color: '#bae6fd' }}>{d.agreedBy}</strong></span>
                        <span className="mono">ID: {d.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Action Items Checklist */}
              <div>
                <div className="glass-panel card-inner">
                  <div className="card-header">
                    <div className="card-title">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      Action Items & Deadlines ({actionItems.filter(a => !a.completed).length} open)
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tap to toggle</span>
                  </div>

                  <div className="action-items-list">
                    {actionItems.map((item) => (
                      <div
                        key={item.id}
                        className={`action-item-row ${item.completed ? 'completed-task' : ''}`}
                        onClick={() => toggleTask(item.id)}
                      >
                        <div className={`action-checkbox ${item.completed ? 'checked' : ''}`}>
                          {item.completed && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div className="action-task-text">{item.task}</div>
                          <div className="action-tags">
                            <span className="assignee-tag">@{item.assignee}</span>
                            <span className="date-tag">Due {item.dueDate}</span>
                            <span className={`priority-badge prio-${item.priority.toLowerCase()}`}>
                              {item.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', fontSize: '0.82rem', color: '#94a3b8' }}>
                    💡 <strong>Actionable Value:</strong> Unlike traditional recorders that output unformatted walls of text, EchoClip extracts responsibilities and deadlines as first-class trackable records.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transcript Subtab */}
          {workspaceSubTab === 'transcript' && (
            <div className="glass-panel card-inner">
              <div className="card-header">
                <div className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Synchronized Multi-Speaker Transcript
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search spoken dialogue..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      color: '#fff',
                      fontSize: '0.84rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
                Tap any dialogue turn to jump the audio playback to that exact timestamp.
              </p>

              <div className="transcript-container">
                {filteredTranscript.map((segment) => {
                  const isActive = activeSegmentId === segment.id;
                  return (
                    <div
                      key={segment.id}
                      className={`transcript-block ${isActive ? 'active-speech' : ''}`}
                      onClick={() => handleSeekSegment(segment)}
                    >
                      <div className="speaker-header">
                        <span className="speaker-name" style={{ color: isActive ? '#a5b4fc' : '#e2e8f0' }}>
                          {segment.speakerName}
                        </span>
                        <span className="speech-time mono">{segment.timeStart}</span>
                      </div>
                      <p className="speech-text">{segment.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Q&A Subtab */}
          {workspaceSubTab === 'qa' && (
            <div className="glass-panel card-inner">
              <div className="card-header">
                <div className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" x2="12.01" y1="17" y2="17" />
                  </svg>
                  Conversational Memory Assistant
                </div>
                <span className="brand-badge">Retrieval-Augmented Intelligence</span>
              </div>

              <div className="qa-panel-wrapper">
                {/* Search / Custom query form */}
                <form onSubmit={handleCustomQuestionSubmit} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Ask anything about this conversation (e.g. 'What was decided about offline fallback?')..."
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '12px 18px',
                      color: '#fff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    className="tab-btn active"
                    style={{ flex: 'none', padding: '0 24px' }}
                  >
                    Query Memory
                  </button>
                </form>

                {customAnswer && (
                  <div className="qa-answer-card">
                    <div className="qa-answer-text">{customAnswer.answer}</div>
                    <div className="citation-badge">
                      <span>Verified Citation:</span>
                      <strong>{customAnswer.citation}</strong>
                    </div>
                  </div>
                )}

                <div>
                  <div className="qa-suggested-title">Or explore indexed questions:</div>
                  <div className="qa-pills-row">
                    {ECHOCLIP_CORE_DATA.sampleConversation.qaExamples.map((item, idx) => (
                      <button
                        key={idx}
                        className={`qa-prompt-pill ${selectedQaIndex === idx && !customAnswer ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedQaIndex(idx);
                          setCustomAnswer(null);
                        }}
                      >
                        <span>{item.question}</span>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Inspect Answer →</span>
                      </button>
                    ))}
                  </div>
                </div>

                {!customAnswer && (
                  <div className="qa-answer-card">
                    <div style={{ fontSize: '0.82rem', color: '#c084fc', marginBottom: '6px', fontWeight: 700 }}>
                      ANSWER FROM CONVERSATION MEMORY:
                    </div>
                    <div className="qa-answer-text">
                      {ECHOCLIP_CORE_DATA.sampleConversation.qaExamples[selectedQaIndex].answer}
                    </div>
                    <div className="citation-badge">
                      <span>Source Reference:</span>
                      <strong>{ECHOCLIP_CORE_DATA.sampleConversation.qaExamples[selectedQaIndex].citation}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* SECTION 2: 5-STAGE PRODUCT JOURNEY */}
      {activeTab === 'workflow' && (
        <section>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>The Core EchoClip Workflow</h2>
            <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '0 auto' }}>
              Turning unstructured speech into searchable memory and verified commitments in 5 disciplined steps.
            </p>
          </div>

          <div className="workflow-timeline">
            {ECHOCLIP_CORE_DATA.workflow.map((stage) => (
              <div key={stage.step} className="glass-panel stage-card">
                <div>
                  <div className="stage-step-badge">{stage.step}</div>
                  <h3 className="stage-name">{stage.name}</h3>
                  <p className="stage-desc">{stage.description}</p>
                </div>
                <div className="stage-detail">{stage.detail}</div>
              </div>
            ))}
          </div>

          {/* Primary Use Cases Grid */}
          <div className="glass-panel card-inner">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Target Workflows & Environments</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {ECHOCLIP_CORE_DATA.primaryUseCases.map((uc, idx) => (
                <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <span className="brand-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{uc.badge}</span>
                  <h4 style={{ fontSize: '1.05rem', margin: '6px 0', color: '#fff' }}>{uc.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: CORE CAPABILITIES */}
      {activeTab === 'features' && (
        <section>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Planned Core Capabilities</h2>
            <p style={{ color: '#94a3b8', maxWidth: '680px', margin: '0 auto' }}>
              Architected to solve human memory limits, manual note-taking friction, and lost decision trails.
            </p>
          </div>

          <div className="features-grid">
            {ECHOCLIP_CORE_DATA.features.map((feat) => (
              <div key={feat.id} className="glass-panel feature-box">
                <span className={`feature-cat-tag cat-${feat.category}`}>{feat.category}</span>
                <h3 className="feature-title">{feat.name}</h3>
                <p className="feature-benefit">{feat.benefit}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: ARCHITECTURE & DATA MODEL */}
      {activeTab === 'architecture' && (
        <section>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>System Architecture & Engineering Stack</h2>
            <p style={{ color: '#94a3b8', maxWidth: '680px', margin: '0 auto' }}>
              Clean Architecture design with decoupled speech modeling, LLM orchestration, and resilient offline state.
            </p>
          </div>

          <div className="arch-grid">
            {ECHOCLIP_CORE_DATA.technologyStack.map((item, idx) => (
              <div key={idx} className="glass-panel arch-card">
                <div className="arch-layer">{item.layer}</div>
                <div className="arch-tech">{item.tech}</div>
                <div className="arch-purpose">{item.purpose}</div>
              </div>
            ))}
          </div>

          {/* Recording Lifecycle State Machine */}
          <div className="glass-panel card-inner" style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>Recording Lifecycle State Machine</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', padding: '16px 0' }}>
              <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontWeight: 600, fontSize: '0.85rem' }}>
                1. Recording
              </div>
              <span style={{ color: '#64748b' }}>→</span>
              <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93c5fd', fontWeight: 600, fontSize: '0.85rem' }}>
                2. Uploaded / Saved
              </div>
              <span style={{ color: '#64748b' }}>→</span>
              <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fde68a', fontWeight: 600, fontSize: '0.85rem' }}>
                3. Transcribing (STT)
              </div>
              <span style={{ color: '#64748b' }}>→</span>
              <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#e9d5ff', fontWeight: 600, fontSize: '0.85rem' }}>
                4. Summarized (LLM)
              </div>
              <span style={{ color: '#64748b' }}>→</span>
              <div style={{ padding: '8px 14px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7', fontWeight: 600, fontSize: '0.85rem' }}>
                5. Ready & Indexed
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '10px' }}>
              Includes explicit background job retry states and local crash recovery if network disconnects during upload.
            </p>
          </div>
        </section>
      )}

      {/* SECTION 5: PRIVACY & TRUST CONTROLS */}
      {activeTab === 'privacy' && (
        <section>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Responsible AI & Privacy Engineering</h2>
            <p style={{ color: '#94a3b8', maxWidth: '680px', margin: '0 auto' }}>
              Trust is EchoClip's foundational differentiator. Engineering controls ensure explicit consent, transparency, and complete user sovereignty.
            </p>
          </div>

          {/* Privacy Toggles Simulator */}
          <div className="privacy-toggle-grid">
            <div className="toggle-card">
              <div className="toggle-info">
                <h4>Recording Consent Verification</h4>
                <p>Prompts attendees with audible chime and records consent state</p>
              </div>
              <button
                className={`switch-pill ${privacyToggles.consentLogged ? 'switch-on' : ''}`}
                onClick={() => setPrivacyToggles(prev => ({ ...prev, consentLogged: !prev.consentLogged }))}
              >
                <div className="switch-knob"></div>
              </button>
            </div>

            <div className="toggle-card">
              <div className="toggle-info">
                <h4>External AI Processing Disclosures</h4>
                <p>Notifies users when speech chunks are sent to ElevenLabs or Gemini</p>
              </div>
              <button
                className={`switch-pill ${privacyToggles.externalAiDisclosure ? 'switch-on' : ''}`}
                onClick={() => setPrivacyToggles(prev => ({ ...prev, externalAiDisclosure: !prev.externalAiDisclosure }))}
              >
                <div className="switch-knob"></div>
              </button>
            </div>

            <div className="toggle-card">
              <div className="toggle-info">
                <h4>Local-First Storage Buffering</h4>
                <p>Buffers audio chunks securely in device cache before cloud synchronization</p>
              </div>
              <button
                className={`switch-pill ${privacyToggles.localFirstBuffer ? 'switch-on' : ''}`}
                onClick={() => setPrivacyToggles(prev => ({ ...prev, localFirstBuffer: !prev.localFirstBuffer }))}
              >
                <div className="switch-knob"></div>
              </button>
            </div>

            <div className="toggle-card">
              <div className="toggle-info">
                <h4>PII Redaction Engine</h4>
                <p>Automatically filters phone numbers, credit cards, and addresses from transcripts</p>
              </div>
              <button
                className={`switch-pill ${privacyToggles.piiScrubbing ? 'switch-on' : ''}`}
                onClick={() => setPrivacyToggles(prev => ({ ...prev, piiScrubbing: !prev.piiScrubbing }))}
              >
                <div className="switch-knob"></div>
              </button>
            </div>
          </div>

          {/* Audit Events Log */}
          <div className="glass-panel card-inner">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Sensitive Access Audit Log</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>Provider / Endpoint</th>
                    <th>Authorization</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mono">10:15:02 AM</td>
                    <td>Participant Consent Recorded</td>
                    <td>Local Security Enclave</td>
                    <td>Session Host (Alex Chen)</td>
                    <td style={{ color: '#34d399' }}>Verified</td>
                  </tr>
                  <tr>
                    <td className="mono">10:15:20 AM</td>
                    <td>Audio Stream Ingestion</td>
                    <td>ElevenLabs Scribe STT</td>
                    <td>OAuth 2.0 Isolated Token</td>
                    <td style={{ color: '#34d399' }}>Success</td>
                  </tr>
                  <tr>
                    <td className="mono">10:29:40 AM</td>
                    <td>Summary & Task Extraction</td>
                    <td>Gemini Reasoning API</td>
                    <td>Encrypted Prompt Payload</td>
                    <td style={{ color: '#34d399' }}>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <div>
          <strong>EchoClip</strong> — AI-Powered Conversation Intelligence
        </div>
        <div>
          Core Workflow: Capture → Understand → Structure → Retrieve → Act
        </div>
      </footer>
    </div>
  );
}

export default App;
