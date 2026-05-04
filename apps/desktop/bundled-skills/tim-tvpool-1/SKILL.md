---
name: tim-tvpool-1
description: Entertainment news research skill — monitor Facebook/Twitter accounts, analyze engagement, and compile trending stories into workspace markdown reports.
command: /tim-tvpool-1
verified: true
---

# Tim TVPool #1 — Entertainment News Research Skill

## Overview

This skill automates entertainment news research by monitoring Facebook pages and Twitter/X accounts, analyzing post engagement (likes, comments, shares), collecting linked content, and compiling findings into markdown reports organized by date.

---

## Agent Workflow (Always Follow This Order)

1. **Setup** — Navigate to target accounts, prepare workspace folder.
2. **Scan posts** — Go through each account's latest posts one by one.
3. **Analyze engagement** — Check likes, comments, shares for each post.
4. **Collect links** — Read comments for website links, open in new tabs.
5. **Summarize** — Compile findings into a structured markdown report.
6. **Save** — Store report in `tvpool/[YYYY-MM-DD_HH-mm]/` folder.

---

## 1. Target Account Setup

### Default accounts to monitor (customize as needed):

**Facebook Pages (10-20 pages):**

- Configure the list of Facebook page URLs to monitor
- Store in a notes file or pass as input when running the skill

**Twitter/X Accounts (10-20 accounts):**

- Configure the list of Twitter/X profile URLs to monitor
- Store in a notes file or pass as input when running the skill

### Navigation pattern:

```
1. Navigate to the Facebook page or Twitter profile URL
2. Wait for the page to fully load (look for feed/posts appearing)
3. Take a screenshot to confirm the page loaded correctly
4. If login is required, ask the user to log in manually
```

---

## 2. Post Scanning

### Facebook Post Scanning:

```
1. Navigate to the Facebook page
2. Take a screenshot to see the current feed
3. For each post (top to bottom, newest first):
   a. Capture the post content (text, images, video)
   b. Record engagement metrics:
      - Likes/Reactions count
      - Comments count
      - Shares count
   c. Note the post timestamp
   d. Check for tags/hashtags in the post
   e. Scroll down to load more posts if needed
4. Continue until you've scanned at least 5-10 most recent posts per page
```

### Twitter/X Post Scanning:

```
1. Navigate to the Twitter/X profile
2. Take a screenshot to see the current feed
3. For each tweet (top to bottom, newest first):
   a. Capture the tweet content (text, images, video)
   b. Record engagement metrics:
      - Likes count
      - Retweets count
      - Replies count
      - Views count (if visible)
   c. Note the tweet timestamp
   d. Check for hashtags and mentions
   e. Scroll down to load more tweets if needed
4. Continue until you've scanned at least 5-10 most recent tweets per account
```

---

## 3. Engagement Analysis

### Popularity Assessment:

For each post, analyze whether it's trending/popular:

```
HIGH ENGAGEMENT (likely trending):
- Facebook: 100+ likes, 50+ comments, 20+ shares
- Twitter/X: 100+ likes, 50+ retweets, 20+ replies

MEDIUM ENGAGEMENT:
- Facebook: 20-99 likes, 10-49 comments, 5-19 shares
- Twitter/X: 20-99 likes, 10-49 retweets, 5-19 replies

LOW ENGAGEMENT:
- Facebook: <20 likes, <10 comments, <5 shares
- Twitter/X: <20 likes, <10 retweets, <5 replies
```

### Content Analysis:

For each post, note:

- **Topic**: What is the post about?
- **Sentiment**: Positive, negative, neutral
- **Tags/Hashtags**: List all hashtags and mentions
- **Media**: Does it include images, videos, or links?
- **Timeliness**: Is this breaking news or evergreen content?

---

## 4. Comment Analysis & Link Collection

### Check comments for website links:

```
1. For posts with HIGH or MEDIUM engagement:
   a. Click on the post to view all comments
   b. Scroll through comments looking for:
      - URLs (http://, https://, www.)
      - "Read more at..." type comments
      - Page/admin responses with links
   c. For each link found:
      i.   Open in a NEW browser tab
      ii.  Wait for page to load
      iii. Take a screenshot
      iv.  Read and summarize the linked content
      v.   Close the tab
   d. Record the linked content summary alongside the original post
```

### Link Collection Pattern:

```
For each comment with a link:
1. Right-click the link → "Open link in new tab" (or Cmd+click)
2. Switch to the new tab
3. Wait for page to load fully
4. Take a screenshot
5. Use browser_evaluate or browser_get_text to extract article content:
   - Headline/title
   - Main body text
   - Author (if available)
   - Publication date
6. Summarize the content in 2-3 sentences
7. Close the tab and return to the original post
```

---

## 5. Workspace Folder Setup

### Create the report folder:

```
1. Navigate to the workspace root (or project folder)
2. Create folder: tvpool/[YYYY-MM-DD_HH-mm]/
   Example: tvpool/2025-01-15_14-30/
3. All collected screenshots and reports go into this folder
```

### Folder Structure:

```
tvpool/
  └── 2025-01-15_14-30/
      ├── report.md              ← Main summary report
      ├── screenshots/           ← Screenshots of posts
      │   ├── fb-page1-post1.png
      │   ├── fb-page1-post2.png
      │   ├── twitter-account1-tweet1.png
      │   └── ...
      └── linked-content/        ← Screenshots of linked articles
          ├── article1-summary.md
          ├── article2-summary.md
          └── ...
```

---

## 6. Report Generation

### Create report.md:

Write a structured markdown report with the following sections:

```markdown
# Tim TVPool Report — [YYYY-MM-DD HH:mm]

## Summary

[2-3 sentence overview of today's trending entertainment news]

---

## 🔥 Trending Stories (High Engagement)

### [Story Title/Topic]

- **Source**: [Facebook Page Name / Twitter Account]
- **Post URL**: [Link to post]
- **Engagement**: X likes, Y comments, Z shares
- **Topic**: [What is this about?]
- **Sentiment**: Positive / Negative / Neutral
- **Tags**: #hashtag1 #hashtag2
- **Summary**: [2-3 sentence summary]
- **Linked Content**: [If comments had links, summarize here]
  - [Article title](URL) — [Brief summary]

---

## 📊 Notable Posts (Medium Engagement)

### [Story Title/Topic]

- **Source**: [Facebook Page Name / Twitter Account]
- **Post URL**: [Link to post]
- **Engagement**: X likes, Y comments, Z shares
- **Summary**: [Brief summary]
- **Tags**: #hashtag1 #hashtag2

---

## 📝 Other Posts (Low Engagement)

- [Brief list of other notable posts with engagement numbers]

---

## 📈 Top Hashtags Today

- #hashtag1 — mentioned X times
- #hashtag2 — mentioned Y times

---

## 📋 Accounts Monitored

### Facebook Pages:

- [Page 1](URL) — X posts scanned
- [Page 2](URL) — Y posts scanned

### Twitter/X Accounts:

- [@account1](URL) — X tweets scanned
- [@account2](URL) — Y tweets scanned

---

_Report generated: YYYY-MM-DD HH:mm_
```

---

## 7. Browser Automation Tips

### Facebook-specific:

- **Login required**: Facebook requires login to see full feeds. Ask user to log in if needed.
- **Infinite scroll**: Facebook loads posts as you scroll. Scroll down gradually (not too fast).
- **Post expansion**: Click "See more" on posts with truncated text to see full content.
- **Comments**: Click on comment count to load all comments. May require additional scrolling.

### Twitter/X-specific:

- **Login may be required**: Twitter limits visibility without login. Ask user to log in if needed.
- **Timeline loads gradually**: Scroll down to load more tweets.
- **Thread detection**: If a tweet is part of a thread, expand the thread to read all parts.
- **Quote tweets**: Check quote tweets for additional context.

### General:

- **Screenshot before and after** every significant action
- **Wait for page loads** — both platforms are SPAs, look for loading spinners
- **Use keyboard shortcuts** when possible (more reliable than coordinate clicks)
- **One tab per account** — keep each Facebook/Twitter page in its own tab for easy navigation
- **Take breaks between requests** — avoid triggering rate limits or bot detection

---

## 8. Error Recovery

**Common problems and fixes:**

| Problem                   | Fix                                                    |
| ------------------------- | ------------------------------------------------------ |
| Login required            | Ask user to log in manually, then continue             |
| Page won't load           | Refresh (Cmd+R), wait, retry                           |
| Rate limited              | Wait 30 seconds, then continue with remaining accounts |
| Post deleted/unavailable  | Skip and note as "unavailable"                         |
| Comments not loading      | Click comment area, wait, scroll to load more          |
| Link opens in-app browser | Right-click → "Open in new tab"                        |

**If something goes wrong:**

1. Take a screenshot to assess current state
2. `Cmd+Z` to undo if applicable
3. Refresh the page if stuck
4. Skip problematic posts/accounts and continue with others
5. Note any skipped items in the final report

---

## 9. Saving

- Save the `report.md` file in the workspace folder
- Save all screenshots in the `screenshots/` subfolder
- Save linked article summaries in `linked-content/` subfolder
- Confirm all files are saved before finishing
- Take a final screenshot showing the completed report

---

## 10. Example Run

### User request:

"Run Tim TVPool — check today's entertainment news"

### Agent actions:

```
1. Navigate to facebook.com/page1 → screenshot → scan 5 posts
2. For each post: record engagement, check comments for links
3. Open linked articles in new tabs → summarize → close tabs
4. Repeat for all 10-20 Facebook pages and Twitter accounts
5. Create tvpool/2025-01-15_14-30/ folder in workspace
6. Write report.md with trending stories, notable posts, hashtags
7. Save all screenshots and summaries
8. Show user the completed report
```

---

## 11. Customization

### Adding/removing target accounts:

- Store the list of monitored accounts in a configuration file
- User can edit this list at any time
- Default list should cover major entertainment news sources in Thailand

### Adjusting engagement thresholds:

- HIGH/MEDIUM/LOW thresholds can be adjusted based on account size
- Consider normalizing by follower count if accounts vary greatly in size

### Report frequency:

- Can be run on demand or scheduled (e.g., morning, afternoon, evening)
- Each run creates a new timestamped folder
