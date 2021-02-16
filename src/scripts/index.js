import '../styles/index.scss';
import './app.ts';

if (process.env.NODE_ENV === 'development') {
  /* require pages that u want to livereload in development mode */
  require("../pages/index.handlebars");
  require("../pages/fage.handlebars");
}