import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../constants';
import { handleScrollTop } from '../../utils';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="footer__content">
              <h3 className="footer__content__title">Tentang</h3>
                            <p className="footer__content__description">
                Daflixx adalah situs web streaming film gratis tanpa iklan.
                Situs web ini tidak menyimpan file apapun, kami hanya menghosting file dari pihak ketiga,
    
                Sehingga kami tidak memiliki hak lebih atas file yang tersedia di situs web ini.
    
                Situs web ini tidak menyediakan tombol download untuk pengguna mengunduh file film ataupun series.
    
                Namun server pihak ke tiga telah menyediakan tombol download yang bisa pengguna gunakan jika ingin mengunduhnya.
              </p>
              <div className="footer__content__socials">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=dhaaz-bot@svk.jp`}
                  className="footer__content__socials__item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bx-mail-send"></i>
                </a>
              </div>
            </div>
          </div>
          {footerLinks.map((item, i) => (
            <div className="col-lg-3 col-md-6 col-6" key={i}>
              <div className="footer__content flex">
                <h3 className="footer__content__title">{item.title}</h3>
                <ul className="footer__content__list">
                  {item.childrens.map((child, i) => (
                    <li key={i} onClick={handleScrollTop}>
                      <Link to={child?.path}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="footer__copyright section">
        <span>&copy; 2022 &bull; DHAAZ</span>
      </p>
    </div>
  );
};

export default React.memo(Footer);
