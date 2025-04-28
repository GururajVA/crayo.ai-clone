// globals.d.ts (create this file if it doesn't exist)
declare module 'ytdl-core' {
  interface VideoDetails {
    thumbnails: Array<{ url: string }>;
  }
}