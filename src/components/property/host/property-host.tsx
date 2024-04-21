import React from 'react';

import {Host} from '../../../types/types';

interface IProps {
  host: Host;
  description: string;
}

function PropertyHost({host, description}: IProps) {

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
          <img
            className="property__avatar user__avatar"
            src={host.avatarUrl}
            width={74}
            height={74}
            alt="Host avatar"
          />
        </div>
        <span className="property__user-name">{host.name}</span>
        {host.isPro && <span className="property__user-status">Pro</span>}
      </div>
      <div className="property__description">
        {description}
      </div>
    </div>
  );
}

export default PropertyHost;


