import React from 'react';
import PageSection from '../pageSection';

const BannerUI = ({ children, isMaintenance }) => {

  return (
    <PageSection
      margin="-24px -24px 0 -24px"
      bg="/background.jpg"
      mask={`linear-gradient(90deg,rgba(14, 10, 49, ${
        isMaintenance ? 1 : 0.53
      }),rgba(47, 23, 95, ${isMaintenance ? 1 : 0.35}));`}
    >
      {children}
    </PageSection>
  );
};

export default BannerUI;