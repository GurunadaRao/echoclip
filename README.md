# EchoClip — AI-Powered Conversation Intelligence

> **"Every conversation has value. Make it actionable."**

EchoClip is an AI-powered voice recorder and conversational intelligence system designed to turn spoken conversations into organized, searchable, and actionable knowledge while prioritizing user privacy and responsible recording.

---

## 🎯 The Core Product Journey

```
Conversation ──► Structured Knowledge ──► Searchable Memory ──► Actionable Outcomes
```

1. **01 Capture**: One-tap high-fidelity audio capture with resilient pause, resume, and crash recovery.
2. **02 Understand**: Speech-to-text with millisecond timestamps and speaker separation (ElevenLabs Scribe & Whisper).
3. **03 Structure**: LLM synthesis extracting concise executive summaries, key decisions, and prioritized tasks.
4. **04 Retrieve**: Full-text & semantic search with interactive conversational Q&A across past meetings.
5. **05 Act**: Dedicated ownership accountability, due dates, and follow-up checklists.

---

## 🚀 Core Features

- **One-Tap Audio Recording**: Low-latency capture without complicated setup.
- **Speech-to-Text Transcription**: Synchronized dialogue turns with speaker diarization.
- **AI Executive Summaries**: Review discussions in seconds with topic outlines.
- **Key-Point Extraction**: Pinpoint critical insights and eliminate conversational noise.
- **Decision Extraction**: Structured records of agreed consensus, context, and stakeholders.
- **Action Items & Deadlines**: First-class actionable task objects with assignees and due dates.
- **Bidirectional Audio/Transcript Sync**: Jump audio playback directly to any spoken sentence.
- **Conversational Memory Q&A**: Query stored conversations and receive cited answers.
- **Privacy Controls & Audit Logging**: Consent verification, external AI disclosures, and local-first data retention.

---

## 🛠️ Technology Stack & Architecture

- **Client App**: React 19, TypeScript, Vite (Web) & Flutter, Dart, Riverpod 2.6.1 (Clean Architecture Mobile)
- **Speech Recognition**: ElevenLabs Scribe & Whisper STT
- **Language Models**: Gemini & OpenRouter orchestration
- **Background Pipeline**: Asynchronous job queues with automated retries and state tracking
- **Security & Privacy**: Local-first storage, consent verification, and sensitive access audit trails

### Recording Lifecycle State Machine

```
recording ──► uploaded / saved ──► transcribing ──► summarized ──► ready & indexed
```

---

## 💻 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🔒 Privacy & Responsible AI

EchoClip is built on privacy-first foundations:
- **Consent-First Protocol**: Explicit notification and consent recording prior to ingestion.
- **Transparent Processing**: Disclosures on which data segments are processed by external AI providers.
- **Isolated User Storage**: Strict authorization boundaries ensuring user data confidentiality.
- **User-Governed Retention**: Complete one-tap deletion of audio recordings, transcripts, and summaries.
