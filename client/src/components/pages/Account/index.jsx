import React from 'react';

/* Assets */
import { BlankProfile } from '../../../assets';

/* Children */
import { Button, HorizontalRule } from '../../atoms';

/* Utils */
import LocalStorageMethods from '../../../utils/localStorage';

/* Styles */
import { ClassicLayout } from '../../templates';
import Styled from './Styled';
import MetaHead from '../../helper/MetaHead';

export default function Account() {
  const { name, email } = LocalStorageMethods.getParsedItem('user');

  return (
    <ClassicLayout>
      <MetaHead
        title="My account"
        description="Check your personal data and more on your personal page."
      />
      <Styled>
        <header>
          <div className="ImageContainer">
            <img src={ BlankProfile } alt="Profile" />
          </div>

          <h2>{ name }</h2>

          <span id="email">{ email }</span>
        </header>

        <HorizontalRule />

        <div className="Links">
          <Button type="button" link>
            <a
              href="http://"
              target="_blank"
              rel="noreferrer"
            >
              Edit Profile
            </a>
          </Button>
          <Button type="button" link>
            <a
              href="http://"
              target="_blank"
              rel="noreferrer"
            >
              Change Password
            </a>
          </Button>
          <Button type="button" link>
            <a
              href="http://"
              target="_blank"
              rel="noreferrer"
            >
              Logout
            </a>
          </Button>
        </div>
      </Styled>
    </ClassicLayout>
  );
}
