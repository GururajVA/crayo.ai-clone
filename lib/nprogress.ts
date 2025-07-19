// lib/nprogress.ts
import NProgress from 'nprogress';


NProgress.configure({
  minimum: 0.2,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

export default NProgress;
