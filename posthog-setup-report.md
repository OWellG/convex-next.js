# PostHog post-wizard report

The wizard integrated PostHog into this Next.js App Router application using `posthog-js`, initialized analytics and exception autocapture in `instrumentation-client.ts`, synchronized authenticated Clerk users with PostHog, and instrumented the core video publishing and commenting flows. PostHog configuration is read from Next.js environment variables, while default autocapture and session recording behavior remain enabled.

| Event | Description | File |
|---|---|---|
| `upload_started` | A signed-in user starts publishing a selected video clip. | `app/upload/page.tsx` |
| `video_published` | A video clip is successfully uploaded and its metadata is saved. | `app/upload/page.tsx` |
| `video_upload_failed` | Publishing a video clip fails during storage upload or metadata persistence. | `app/upload/page.tsx` |
| `comment_posted` | A signed-in user successfully posts a comment on a video. | `app/video/[id]/page.tsx` |

## Next steps

A dashboard is ready for the events instrumented by the wizard:

- [Analytics basics (wizard)](https://eu.posthog.com/project/228887/dashboard/837052)

The new custom events have not yet been ingested by this PostHog project, so insights could not safely be created against the live schema. Trigger a video upload and comment in a running application, then add publishing conversion, upload failure, and commenting insights to this dashboard.

## Verify before merging

- [ ] Run a full production build and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or the bundler upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path calls `identify` after Clerk restores the authenticated user.

### Agent skill

An agent skill folder remains in the project at `.claude/skills/integration-nextjs-app-router`. It provides current framework-specific context for further PostHog development with Claude Code.
