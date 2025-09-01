# **App Name**: Verity Vista

## Core Features:

- Content Credibility Analysis: Analyze pasted text, URLs, or social media posts to determine a credibility score, misinformation risk level, and flagged patterns using an LLM tool.
- Source Credibility Check: Scrape the source domain and cross-reference it against a database to determine its credibility level (trusted, biased, satire, flagged).
- Explainability & Education: Provide human-readable explanations for credibility assessments, such as 'This article uses emotional trigger words without citing sources,' and offer bite-sized media literacy lessons.
- Learning Dashboard: Track the number of checks performed, accuracy, and progress streaks. Visualize credibility score trends over time using Recharts and display XP and badges earned.
- User Authentication: Secure user login via NextAuth (Google/Email) to store profile and analysis history.
- Visualized Risk Assessment: Display credibility scores with gauges and color-coded risk badges to provide quick visual assessments of content reliability.
- Misinformation Category Detection: Detects and labels content as Clickbait, Conspiracy, Deepfake, Satire, Bias, Fabrication. Uses icons + colors for easy recognition.
- Cross-Verification with Fact-Checking Sources: Suggests related fact-check articles (PolitiFact, Snopes, BBC Verify, etc.). Provides side-by-side comparisons or swipeable cards.
- Claim-Level Analysis: Breaks content into key claims. Highlights which claims are credible, misleading, or unsupported.
- Multimodal Analysis: Users upload an image, meme, or screenshot. AI checks for manipulation (reverse search, AI-generated detection, out-of-context usage).
- Community Feedback & Consensus: Users can upvote/downvote AI judgments. Shows consensus % next to AI score.
- Explain Like I’m 5 Mode: Simplified breakdowns for kids/younger audiences. Example: “This story looks like a rumor because it doesn’t say who or where.”
- Gamified Learning Mode: Daily 2-min quizzes on misinformation detection. Rewards with streaks, XP, badges, and leaderboards.
- Bias & Sentiment Analysis: Detects political/ideological bias. Shows sentiment (positive, negative, extreme) to flag emotionally manipulative content.
- Historical Tracking: Lets users see how the credibility of a domain changes over time. Example: “This website shifted from trusted → questionable in the last 6 months.”
- Browser Extension / Mobile PWA: One-click “Check credibility” button directly on any webpage. Saves results to user’s dashboard automatically.
- Customizable Alerts: Users can set alerts for risky content types (e.g., conspiracy, satire). Push/email notifications when flagged domains are detected.
- Collaborative Learning Spaces: Small group discussions around misinformation cases. Community leaderboard for “Top Truth Seekers.”
- Dark Mode + Accessibility Features: Screen reader-friendly UI. High-contrast theme for visually impaired users.

## Style Guidelines:

- Primary color: Blue (#29ABE2) to evoke trust and reliability.
- Background color: Light blue (#E5F6FE) to create a calm, trustworthy atmosphere.
- Accent color: Amber (#FFC107) to highlight warnings and important information.
- Body and headline font: 'Inter' (sans-serif) for a clean, modern, and readable experience.
- Use icons from lucide-react (via shadcn/ui) to represent different categories of misinformation and source credibility.
- Sidebar navigation with clear sections for Home, Analyze, Learn, Dashboard, Quizzes, and Profile to ensure ease of use and accessibility.
- Use subtle fade-in animations for analysis results and confetti animations when users unlock XP badges to enhance user engagement.