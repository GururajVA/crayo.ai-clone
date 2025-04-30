declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'ytdl-core' {
  interface VideoFormat {
    qualityLabel: string;
    container: string;
    url: string;
  }
}