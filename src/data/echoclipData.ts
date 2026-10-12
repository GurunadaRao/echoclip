export interface Feature {
  id: string;
  name: string;
  benefit: string;
  icon: string;
  category: 'Capture' | 'Intelligence' | 'Action' | 'Privacy';
}

export interface WorkflowStage {
  step: string;
  name: string;
  description: string;
  detail: string;
  icon: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface TranscriptSegment {
  id: string;
  speakerId: string;
  speakerName: string;
  timeStart: string;
  timeSeconds: number;
  text: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface Decision {
  id: string;
  decision: string;
  context: string;
  agreedBy: string;
}

export interface ConversationSample {
  id: string;
  title: string;
  recordedAt: string;
  duration: string;
  durationSeconds: number;
  lifecycleStatus: 'recording' | 'uploaded' | 'transcribing' | 'summarized' | 'ready';
  summary: {
    overview: string;
    topics: string[];
    keyPoints: string[];
  };
  decisions: Decision[];
  actionItems: ActionItem[];
  transcript: TranscriptSegment[];
  qaExamples: {
    question: string;
    answer: string;
    citation: string;
  }[];
}

export interface TechArchitectureComponent {
  layer: string;
  tech: string;
  purpose: string;
}

export const ECHOCLIP_CORE_DATA = {
  identity: {
    name: 'EchoClip',
    tagline: 'Every conversation has value. Make it actionable.',
    positioning: 'AI-Powered Conversation Intelligence & Memory Assistant',
    mission: 'To transform everyday conversations into valuable, searchable knowledge, helping people capture important information, understand discussions, organize decisions, and track action items while prioritizing privacy and accessibility.',
    vision: 'To become a trusted layer between conversations and knowledge—helping people revisit important information and turn it into meaningful action.',
    differentiatorJourney: 'Conversation → Structured Knowledge → Searchable Memory → Actionable Outcomes'
  },

  workflow: [
    {
      step: '01',
      name: 'Capture',
      description: 'Record important conversations',
      detail: 'One-tap low-latency audio capture with resilient pause, resume, and crash recovery across meetings, lectures, and calls.',
      icon: 'mic'
    },
    {
      step: '02',
      name: 'Understand',
      description: 'Transcribe and interpret speech',
      detail: 'State-of-the-art speech-to-text with precise timestamps and multi-speaker separation (ElevenLabs Scribe & Whisper).',
      icon: 'waveform'
    },
    {
      step: '03',
      name: 'Structure',
      description: 'Generate summaries, decisions, & action items',
      detail: 'LLM reasoning engine synthesizes dense discussions into clear summaries, extracted decisions, and prioritized tasks.',
      icon: 'sparkles'
    },
    {
      step: '04',
      name: 'Retrieve',
      description: 'Search transcripts and ask questions',
      detail: 'Full-text & semantic retrieval with interactive AI conversational Q&A across the entire conversation archive.',
      icon: 'search'
    },
    {
      step: '05',
      name: 'Act',
      description: 'Revisit commitments and follow up',
      detail: 'Seamlessly track deadlines, view ownership accountability, and export commitments into your team workflow.',
      icon: 'check-circle'
    }
  ] as WorkflowStage[],

  features: [
    {
      id: 'f1',
      name: 'One-Tap Audio Recording',
      benefit: 'Capture high-fidelity discussions without friction or complicated setup',
      icon: 'mic',
      category: 'Capture'
    },
    {
      id: 'f2',
      name: 'Speech-to-Text Transcription',
      benefit: 'Transforms spoken dialogue into readable text with accurate speaker diarization',
      icon: 'waveform',
      category: 'Capture'
    },
    {
      id: 'f3',
      name: 'AI Executive Summaries',
      benefit: 'Review 60-minute conversations in under 60 seconds with structured topic outlines',
      icon: 'sparkles',
      category: 'Intelligence'
    },
    {
      id: 'f4',
      name: 'Key-Point Extraction',
      benefit: 'Instantly identifies critical insights and eliminates conversational noise',
      icon: 'target',
      category: 'Intelligence'
    },
    {
      id: 'f5',
      name: 'Decision Extraction',
      benefit: 'Captures exactly what was agreed upon, the rationale, and who consented',
      icon: 'shield-check',
      category: 'Action'
    },
    {
      id: 'f6',
      name: 'Action Items & Deadlines',
      benefit: 'Converts discussions into assigned tasks with due dates and priority tags',
      icon: 'list-todo',
      category: 'Action'
    },
    {
      id: 'f7',
      name: 'Audio/Transcript Sync',
      benefit: 'Click any word to seek directly to the exact millisecond in the audio recording',
      icon: 'play',
      category: 'Capture'
    },
    {
      id: 'f8',
      name: 'Conversational AI Q&A',
      benefit: 'Ask questions directly against past discussions and get cited answers',
      icon: 'message-square',
      category: 'Intelligence'
    },
    {
      id: 'f9',
      name: 'Searchable Memory Archive',
      benefit: 'Instant search across months of conversations with contextual snippets',
      icon: 'search',
      category: 'Intelligence'
    },
    {
      id: 'f10',
      name: 'Privacy & Consent Controls',
      benefit: 'Granular controls for recording consent, local data retention, and external AI disclosure',
      icon: 'lock',
      category: 'Privacy'
    }
  ] as Feature[],

  primaryUseCases: [
    {
      title: 'Meetings & Team Syncs',
      description: 'Never miss an action item or project decision while staying actively engaged in the discussion.',
      badge: 'Workplace'
    },
    {
      title: 'Lectures & Learning Sessions',
      description: 'Extract key concepts, study notes, and references from hours of academic or technical talks.',
      badge: 'Education'
    },
    {
      title: 'Customer & User Research',
      description: 'Preserve unfiltered user feedback, pain points, and feature requests with zero note-taking delay.',
      badge: 'Product'
    },
    {
      title: 'Brainstorming & Strategy',
      description: 'Capture rapid-fire ideas without losing the original train of thought or context.',
      badge: 'Strategy'
    }
  ],

  technologyStack: [
    {
      layer: 'Client Application',
      tech: 'Flutter, Dart, Riverpod 2.6.1',
      purpose: 'Clean Architecture mobile experience with resilient state and offline playback'
    },
    {
      layer: 'Speech Recognition (STT)',
      tech: 'ElevenLabs Scribe & Whisper',
      purpose: 'Fast, high-accuracy acoustic modeling with speaker timestamps'
    },
    {
      layer: 'Language Intelligence',
      tech: 'Gemini 1.5 / OpenRouter Models',
      purpose: 'Reasoning pipeline for structured summaries, decision tags, and task extraction'
    },
    {
      layer: 'Background Processing',
      tech: 'Asynchronous Job Queues & Retries',
      purpose: 'Fault-tolerant multi-stage audio upload, transcription, and indexing lifecycle'
    },
    {
      layer: 'Retrieval & Memory',
      tech: 'Full-text indexing & Semantic embeddings',
      purpose: 'Fast cross-recording search and conversational question answering'
    },
    {
      layer: 'Privacy & Security',
      tech: 'Local storage, consent records & audit logs',
      purpose: 'Explicit external AI disclosures and end-to-end user data isolation'
    }
  ] as TechArchitectureComponent[],

  privacyPrinciples: [
    {
      title: 'Consent-First Protocol',
      description: 'Clear audio indicators and recorded consent acknowledgments before conversation capture.'
    },
    {
      title: 'Transparent AI Processing',
      description: 'Explicit transparency regarding which speech segments or summaries utilize external AI APIs.'
    },
    {
      title: 'Isolated Data Ownership',
      description: 'Strict authorization checks ensuring recordings and transcripts remain exclusively accessible to the owner.'
    },
    {
      title: 'User-Governed Retention',
      description: 'One-click full deletion of transcripts, summaries, and audio files across all active storage.'
    }
  ],

  // Interactive Live Sample Data
  sampleConversation: {
    id: 'rec-2026-10-sync',
    title: 'Sprint Kickoff & Mobile AI Architecture Review',
    recordedAt: 'Oct 12, 2026 • 10:15 AM',
    duration: '14m 32s',
    durationSeconds: 872,
    lifecycleStatus: 'ready',
    summary: {
      overview: 'The team finalized the audio capture lifecycle and agreed on integrating ElevenLabs Scribe for speech-to-text with fallback to Whisper. Privacy controls will feature on-device consent logging and explicit user confirmation before processing audio chunks with external language models.',
      topics: [
        'Audio capture lifecycle & crash recovery',
        'Speech recognition provider benchmarks',
        'Action items extraction schema',
        'Privacy disclosures & data retention policies'
      ],
      keyPoints: [
        'Recording lifecycle must implement 5 distinct states: recording → uploaded → transcribing → summarized → ready.',
        'Local storage buffering ensures no audio loss occurs during network dropouts.',
        'Decisions and Action Items must be first-class structured entities rather than unstructured text blobs.',
        'Audio timestamps will be mapped bidirectionally so clicking a transcript paragraph jumps audio playback to that exact second.'
      ]
    },
    decisions: [
      {
        id: 'd1',
        decision: 'Adopt ElevenLabs Scribe with Whisper fallback for transcription',
        context: 'Benchmarked latency and speaker separation accuracy for team syncs; Scribe showed 38% faster turnaround for short clips.',
        agreedBy: 'Alex Chen & Maya Lin'
      },
      {
        id: 'd2',
        decision: 'Store action items and decisions as dedicated relational entities',
        context: 'Allows users to export tasks directly into workflow trackers and filter past decisions across months.',
        agreedBy: 'Full Team'
      },
      {
        id: 'd3',
        decision: 'Enforce local-first consent confirmation prior to cloud processing',
        context: 'Ensures enterprise compliance and privacy transparency for sensitive recordings.',
        agreedBy: 'David Park & Alex Chen'
      }
    ],
    actionItems: [
      {
        id: 'a1',
        task: 'Implement Riverpod recording state machine with pause/resume recovery',
        assignee: 'Alex Chen',
        dueDate: 'Oct 16, 2026',
        priority: 'High',
        completed: false
      },
      {
        id: 'a2',
        task: 'Finalize JSON schema for LLM structured decision & task extraction',
        assignee: 'Maya Lin',
        dueDate: 'Oct 18, 2026',
        priority: 'High',
        completed: true
      },
      {
        id: 'a3',
        task: 'Design privacy consent modal and external AI disclosure toggles in UI',
        assignee: 'David Park',
        dueDate: 'Oct 19, 2026',
        priority: 'Medium',
        completed: false
      },
      {
        id: 'a4',
        task: 'Set up automated background retries for failed transcription jobs',
        assignee: 'Alex Chen',
        dueDate: 'Oct 22, 2026',
        priority: 'Medium',
        completed: false
      }
    ],
    transcript: [
      {
        id: 't1',
        speakerId: 'spk1',
        speakerName: 'Alex Chen (Tech Lead)',
        timeStart: '00:04',
        timeSeconds: 4,
        text: 'Thanks everyone for jumping on. Today we need to lock down the audio lifecycle for EchoClip and decide how we handle transcription errors and local retention.'
      },
      {
        id: 't2',
        speakerId: 'spk2',
        speakerName: 'Maya Lin (Product)',
        timeStart: '00:38',
        timeSeconds: 38,
        text: 'From the user research side, the biggest complaint with traditional recorders is that you end up with 45 minutes of audio that nobody ever replays. We need the output to prioritize decisions and action items as primary deliverables.'
      },
      {
        id: 't3',
        speakerId: 'spk3',
        speakerName: 'David Park (UX Design)',
        timeStart: '01:15',
        timeSeconds: 75,
        text: 'Agreed. And in the mobile UI, users should be able to tap any sentence in the transcript and immediately hear that segment of audio playback to verify context.'
      },
      {
        id: 't4',
        speakerId: 'spk1',
        speakerName: 'Alex Chen (Tech Lead)',
        timeStart: '01:52',
        timeSeconds: 112,
        text: 'We can achieve that with synchronized millisecond timestamps from ElevenLabs Scribe. If the connection fails, the local audio buffer queues up and Whisper handles offline processing.'
      },
      {
        id: 't5',
        speakerId: 'spk2',
        speakerName: 'Maya Lin (Product)',
        timeStart: '02:30',
        timeSeconds: 150,
        text: 'Crucially, privacy is our core differentiator. Every participant needs clear transparency before external AI processing begins, and users must have one-tap complete deletion.'
      }
    ],
    qaExamples: [
      {
        question: 'What is the planned fallback if transcription fails?',
        answer: 'The system queues audio chunks in the local device buffer and triggers an automated retry job, with Whisper available as the offline fallback speech engine.',
        citation: 'Alex Chen @ 01:52'
      },
      {
        question: 'How are action items structured?',
        answer: 'Action items are extracted into structured entities with a clear task description, assigned owner, due date, priority rating, and interactive completion state.',
        citation: 'Maya Lin @ 00:38 & Sprint Decisions'
      },
      {
        question: 'What privacy guarantees are provided?',
        answer: 'A consent-first protocol, clear indicators of which third-party AI models process audio, isolated user permissions, and user-governed retention with one-click wipe.',
        citation: 'Maya Lin & David Park @ 02:30'
      }
    ]
  } as ConversationSample
};
