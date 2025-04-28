// lib/nprogress.ts
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  minimum: 0.2,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

export default NProgress;
