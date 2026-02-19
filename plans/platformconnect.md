# Platform connection plan

## Overview

Users connect their social/platform accounts so the app can publish or manage content on their behalf. This document covers the **YouTube** connection flow first; the same pattern can extend to TikTok, Instagram Reels, etc.

---

## 1. YouTube connection – high-level flow

1. User goes to **Settings** (or a **Platforms** / **Connected accounts** page).
2. User clicks **Connect YouTube**.
3. App redirects to **Google OAuth** (YouTube uses Google accounts and YouTube Data/YouTube Studio APIs).
4. User signs in with Google (if needed) and **consents** to the requested scopes (e.g. manage YouTube channel, upload videos).
5. Google redirects back to our app with an **authorization code**.
6. Our backend **exchanges** the code for **access token** and **refresh token**, then stores them securely.
7. We show **“YouTube connected”** and optionally fetch basic channel info (name, thumbnail, subscriber count) for display.

---

## 2. What we need from Google/YouTube

- **Google Cloud project** with:
  - **OAuth 2.0 Client ID** (Web application) and Client Secret.
  - **YouTube Data API v3** and optionally **YouTube Studio / Content ID** APIs enabled (depending on features).
- **OAuth consent screen** configured (e.g. “External” for testing, “Verification” for production).
- **Authorized redirect URI(s)** matching our app, e.g.  
  `https://ourdomain.com/api/auth/callback/youtube`  
  (or a dedicated route like `/api/integrations/youtube/callback`).

---

## 3. Scopes (permissions)

Suggested scopes for “connect YouTube” and basic publishing:

| Scope | Purpose |
|-------|--------|
| `https://www.googleapis.com/auth/youtube.readonly` | Read channel and video metadata. |
| `https://www.googleapis.com/auth/youtube.upload` | Upload videos. |
| `https://www.googleapis.com/auth/youtube.force-ssl` | Full YouTube account access (channel management, playlists, etc.). |

We can start with **readonly + upload** and add **force-ssl** only if we need full management.

- **Offline access**: Request **refresh token** (e.g. `access_type=offline` and `prompt=consent` on first connect) so we can get new access tokens without asking the user again.

---

## 4. Data we store (per user, per platform)

For each connected YouTube account we should store:

| Field | Purpose |
|-------|--------|
| `userId` | Our app user (e.g. from NextAuth session). |
| `platform` | `youtube`. |
| `platformUserId` | Google/YouTube channel or user ID. |
| `accessToken` | Current OAuth access token (short-lived). |
| `refreshToken` | Used to get new access tokens. |
| `tokenExpiresAt` | When the access token expires (optional but useful). |
| `channelTitle` / `channelThumbnail` | For UI display. |
| `connectedAt` | When the user connected. |

- **Storage**: Prefer **encrypted** or **restricted** storage (e.g. DB with encryption at rest, or a secrets store). Never expose tokens to the client except when strictly required.

---

## 5. Backend routes / API

| Step | Route / action | Description |
|------|----------------|-------------|
| Start connect | `GET /api/integrations/youtube/connect` (or link to OAuth URL) | Redirects user to Google OAuth with `client_id`, `redirect_uri`, `scope`, `state` (e.g. `userId` or session id to prevent CSRF). |
| Callback | `GET /api/integrations/youtube/callback` | Receives `code` and `state`; exchanges code for tokens; stores tokens (and optional channel info); redirects user to Settings or “Connected” page. |
| Disconnect | `POST /api/integrations/youtube/disconnect` | Deletes stored tokens for the current user’s YouTube connection. |
| Status | `GET /api/integrations/youtube` or `/api/integrations` | Returns whether YouTube is connected and optionally channel display info (no raw tokens). |

- All routes must **require authentication** (e.g. NextAuth session) and associate connections with the logged-in user.

---

## 6. UI flow (Settings / Platforms page)

1. **Settings** or **Platforms** page lists “YouTube” with:
   - If **not connected**: button **“Connect YouTube”** → triggers redirect to `/api/integrations/youtube/connect` (or equivalent).
   - If **connected**: show channel name/thumbnail, **“Disconnect”** button; optionally “Reconnect” if token is expired and refresh fails.
2. After callback, redirect back to the same page with a query like `?youtube=connected` or `?error=...` and show a short success/error message.
3. Optional: “Test connection” or “Refresh” that calls an API to ensure the token still works (e.g. fetch channel info).

---

## 7. Security and robustness

- **state**: Always send a random `state` in OAuth and verify it in the callback to prevent CSRF.
- **PKCE**: Consider PKCE for public clients if we ever do client-only flows; for server-side code exchange, classic `client_id` + `client_secret` is fine.
- **Tokens**: Store only on the server; never log or send full tokens to the front end.
- **Refresh**: Before any YouTube API call, check expiry and refresh the access token using the refresh token if needed; then retry the request.
- **Disconnect**: On disconnect, remove tokens (and optionally revoke with Google) so the user’s consent is reflected.

---

## 8. Implementation order (YouTube only)

1. **Config**: Add Google OAuth client ID/secret and callback URL to env (e.g. `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_APP_URL` or similar).
2. **DB/schema**: Define a table or document for “platform connections” (userId, platform, tokens, metadata, timestamps).
3. **Connect route**: Implement `GET /api/integrations/youtube/connect` (build OAuth URL, redirect).
4. **Callback route**: Implement `GET /api/integrations/youtube/callback` (exchange code, store tokens, redirect to UI).
5. **Disconnect + status**: Implement disconnect and a small “get my integrations” API.
6. **UI**: On Settings/Platforms, add “Connect YouTube” and “Disconnect” plus connection status.

After this is stable we can add **token refresh** and **YouTube API calls** (e.g. upload, list videos) on top of the same connection.

---

## 9. Later: other platforms

- **TikTok**: Similar OAuth (or login with TikTok) → store tokens → use TikTok APIs for upload/management.
- **Instagram**: Typically **Facebook Login** and **Instagram Graph API** (business/creator accounts); different scopes and APIs.
- **Others**: Each platform will have its own OAuth/scopes and a similar “connect → store tokens → use API” flow; we can reuse the same “platform connections” table and add one section per platform in this doc.

---

## 10. Open decisions / notes

- **Naming**: Keep “YouTube” in routes and UI for clarity; internal platform id can be `youtube`.
- **Multi-account**: Later we may allow “Connect another YouTube account”; same flow with an extra `accountLabel` or similar.
- **Env**: Document required env vars in `.env.example` (e.g. `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, callback base URL).

Once this plan is approved and any changes you want are applied here, we can implement step by step (config → DB → routes → UI).

---

## 11. What you need to provide (step by step)

Follow these steps and provide the values so the app can connect to YouTube.

### Step 1: Create or use a Google Cloud project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one), e.g. **ClipForge**.
3. Note the **Project ID** (you’ll use it if you enable APIs).

### Step 2: Enable the YouTube Data API

1. In the same project, open **APIs & Services** → **Library**.
2. Search for **YouTube Data API v3** and open it.
3. Click **Enable**.

### Step 3: Configure the OAuth consent screen

1. Go to **APIs & Services** → **OAuth consent screen**.
2. Choose **External** (for testing with any Google account) and click **Create**.
3. Fill in:
   - **App name**: e.g. ClipForge AI  
   - **User support email**: your email  
   - **Developer contact**: your email  
4. Click **Save and Continue**.
5. On **Scopes**, click **Add or Remove Scopes** and add:
   - `https://www.googleapis.com/auth/youtube.readonly`
   - `https://www.googleapis.com/auth/youtube.upload`
   - (Optional) `https://www.googleapis.com/auth/youtube.force-ssl`
6. Save and continue. On **Test users** you can add your own email for testing (optional for External in dev).

### Step 4: Create OAuth 2.0 credentials

1. Go to **APIs & Services** → **Credentials**.
2. Click **Create Credentials** → **OAuth client ID**.
3. Application type: **Web application**.
4. **Name**: e.g. ClipForge Web.
5. Under **Authorized redirect URIs**, add:
   - Local: `http://localhost:3000/api/integrations/youtube/callback`
   - Production: `https://yourdomain.com/api/integrations/youtube/callback`
6. Click **Create**.
7. You’ll see **Client ID** and **Client secret**. Copy both and keep the secret safe.

### Step 5: Add environment variables

In your app’s `.env` or `.env.local`, add:

```env
# YouTube / Google OAuth (from Step 4)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Base URL of your app (for OAuth redirect)
# Local: http://localhost:3000
# Production: https://yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace `your-client-id` and `your-client-secret` with the values from Step 4. Use your real production URL when you deploy.

### Step 6: Run the app and connect

1. Restart the dev server after adding env vars.
2. Go to **Settings** → **Platforms** (or the Platforms page).
3. Click **Connect** next to YouTube. You’ll be sent to Google to sign in and allow access.
4. After approving, you’ll be redirected back and YouTube will show as connected.

**Checklist**

- [ ] Google Cloud project created/selected  
- [ ] YouTube Data API v3 enabled  
- [ ] OAuth consent screen configured and scopes added  
- [ ] OAuth client ID (Web application) created  
- [ ] Redirect URI added: `.../api/integrations/youtube/callback`  
- [ ] `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXT_PUBLIC_APP_URL` set in `.env`  
- [ ] App restarted and Connect YouTube tested  
