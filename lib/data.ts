export const moods = [
  { emoji: "😌", label: "Calm", color: "#8B9DC3" },
  { emoji: "😊", label: "Good", color: "#7A9E87" },
  { emoji: "😔", label: "Low", color: "#9B7EC8" },
  { emoji: "😤", label: "Stressed", color: "#C47A7A" },
  { emoji: "😴", label: "Tired", color: "#C4A44A" },
  { emoji: "😰", label: "Anxious", color: "#C47A7A" },
  { emoji: "🥰", label: "Grateful", color: "#D4A574" },
  { emoji: "😢", label: "Sad", color: "#8B9DC3" },
];

export const journalPrompts = {
  gratitude: [
    "What's one small thing that went well today?",
    "Who made you smile recently, and why?",
    "What's something you're looking forward to?",
    "Name three things you can see right now that you appreciate.",
    "What's a simple pleasure you enjoyed today?",
    "What's something about yourself you're grateful for?",
  ],
  reframe: [
    "What's a negative thought you've had today? Can you find another way to see it?",
    "What would you tell a friend who was thinking what you're thinking?",
    "Is there evidence that contradicts your worry?",
    "What's the most likely outcome, rather than the worst case?",
    "How might you see this situation differently in a week?",
    "What part of this situation can you actually control?",
  ],
  reflection: [
    "How are you really feeling right now — not how you think you should feel?",
    "What took up most of your mental energy today?",
    "What boundary do you need to set or reinforce?",
    "What would 'enough' look like for you today?",
    "What's one thing you'd like to let go of?",
    "What does your body need right now?",
  ],
};

export const breathingTechniques = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, and hold. A proven technique for calm focus.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Exhale", duration: 4 },
      { label: "Hold", duration: 4 },
    ],
  },
  {
    id: "478",
    name: "4-7-8",
    description: "A natural tranquilliser for the nervous system. Excellent for falling asleep.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Exhale", duration: 8 },
    ],
  },
  {
    id: "sigh",
    name: "Physiological Sigh",
    description: "A double inhale followed by a long exhale. The fastest way to reduce stress in real-time.",
    phases: [
      { label: "Inhale", duration: 2 },
      { label: "Inhale again", duration: 1 },
      { label: "Exhale slowly", duration: 6 },
    ],
  },
];

export const cognitiveDistortions = [
  { name: "All-or-Nothing Thinking", description: "Seeing things in black-and-white categories.", example: "\"If I'm not perfect, I'm a total failure.\"" },
  { name: "Overgeneralisation", description: "Seeing a single negative event as a never-ending pattern.", example: "\"I always mess things up.\"" },
  { name: "Mental Filter", description: "Dwelling on negatives and ignoring positives.", example: "Focusing on the one critical comment and ignoring ten compliments." },
  { name: "Catastrophising", description: "Expecting the worst-case scenario.", example: "\"If I fail this test, my life is over.\"" },
  { name: "Mind Reading", description: "Assuming you know what others think.", example: "\"They must think I'm boring.\"" },
  { name: "Should Statements", description: "Using 'should', 'must', or 'ought' to motivate yourself.", example: "\"I should be further along by now.\"" },
  { name: "Emotional Reasoning", description: "Assuming feelings reflect reality.", example: "\"I feel anxious, so something bad must be about to happen.\"" },
  { name: "Personalisation", description: "Blaming yourself for things outside your control.", example: "\"The team failed because of me.\"" },
];

export const sleepTips = [
  "Put screens away 30 minutes before bed",
  "Keep your bedroom cool (16-18°C)",
  "Try a body scan meditation",
  "Write tomorrow's to-do list to clear your mind",
  "Avoid caffeine after 2pm",
  "Keep a consistent wake-up time, even on weekends",
];

export const crisisResources = [
  { name: "Samaritans", number: "116 123", description: "24/7 emotional support", region: "UK" },
  { name: "Shout", number: "Text SHOUT to 85258", description: "Free crisis counselling via text, 24/7", region: "UK" },
  { name: "CALM", number: "0800 58 58 58", description: "For men in crisis, 5pm–midnight", region: "UK" },
  { name: "Mind Infoline", number: "0300 123 3393", description: "Mental health info & signposting, Mon–Fri 9am–6pm", region: "UK" },
  { name: "Papyrus HOPELINEUK", number: "0800 068 4141", description: "Under-35s suicide prevention", region: "UK" },
];

export const features = [
  { id: "home", icon: "⬢", label: "Home", href: "/", color: "#D4A574" },
  { id: "journal", icon: "✦", label: "Journal", href: "/journal", color: "#7A9E87" },
  { id: "breathe", icon: "◯", label: "Breathe", href: "/breathe", color: "#8B9DC3" },
  { id: "sleep", icon: "◑", label: "Sleep", href: "/sleep", color: "#9B7EC8" },
  { id: "cbt", icon: "△", label: "CBT", href: "/cbt", color: "#C47A7A" },
  { id: "community", icon: "⬡", label: "Community", href: "/community", color: "#C4A44A" },
];
