import { TimeOnly } from './ciel/Clock';
import { Barcode } from './ciel/Ornaments';
import VisitorGlobe from './VisitorGlobe';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-meta" aria-hidden="true">
        Yujia Zeng · Archive · <TimeOnly />
      </p>
      <div className="footer-card">
        <VisitorGlobe />
      </div>
      <div className="footer-end" aria-hidden="true">
        <p className="footer-script">Thank you for visiting</p>
        <Barcode />
      </div>
    </footer>
  );
}
