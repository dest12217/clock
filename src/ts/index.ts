import '../scss/style.scss';
import SetClock from './set_clock';

((doc): void => {
  const root = doc.getElementById('clock');

  if (root) new SetClock(root);
})(document);
